'use server';

import { db } from '@/lib/db';
import { requireAdmin, requireEditor } from '@/lib/security';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';

const FILE_KEYS = [
    'common', 'about', 'services', 'training', 'digital_ia',
    'careers', 'contact', 'legal', 'privacy', 'cookies',
    'insights', 'sectors', 'quiz'
];

const LOCALES = ['fr', 'en'];

/**
 * Import all JSON locale files into the SiteContent DB table
 */
export async function importJsonToDbAction() {
    try {
        await requireAdmin();

        let imported = 0;
        const localesDir = path.resolve(process.cwd(), 'locales');

        for (const locale of LOCALES) {
            for (const fileKey of FILE_KEYS) {
                const filePath = path.join(localesDir, locale, `${fileKey}.json`);

                if (fs.existsSync(filePath)) {
                    const content = fs.readFileSync(filePath, 'utf-8');

                    // Validate it's valid JSON
                    JSON.parse(content);

                    await db.siteContent.upsert({
                        where: {
                            fileKey_locale: { fileKey, locale }
                        },
                        update: { content },
                        create: { fileKey, locale, content }
                    });

                    imported++;
                }
            }
        }

        revalidatePath('/admin/pages');
        return { success: true, imported };
    } catch (e: unknown) {
        console.error('Import error:', e);
        const message = e instanceof Error ? e.message : 'Erreur inconnue';
        return { success: false, error: message };
    }
}

/**
 * Get all site content entries
 */
export async function getAllSiteContent() {
    return await db.siteContent.findMany({
        orderBy: [{ locale: 'asc' }, { fileKey: 'asc' }]
    });
}

/**
 * Get content for a specific file/locale
 */
export async function getSiteContent(fileKey: string, locale: string) {
    const entry = await db.siteContent.findUnique({
        where: { fileKey_locale: { fileKey, locale } }
    });
    return entry ? JSON.parse(entry.content) : null;
}

/**
 * Update a specific value in site content using dot-path notation
 * e.g., updateSiteContentField('common', 'fr', 'hero.slides.0.title', 'Nouveau titre')
 */
export async function updateSiteContentFieldAction(
    fileKey: string,
    locale: string,
    fieldPath: string,
    newValue: string | number | boolean
) {
    try {
        await requireEditor();

        const entry = await db.siteContent.findUnique({
            where: { fileKey_locale: { fileKey, locale } }
        });

        if (!entry) {
            return { success: false, error: 'Contenu non trouvé. Importez d\'abord le contenu JSON.' };
        }

        const content = JSON.parse(entry.content);

        // Set value at path
        setNestedValue(content, fieldPath, newValue);

        await db.siteContent.update({
            where: { fileKey_locale: { fileKey, locale } },
            data: { content: JSON.stringify(content, null, 2) }
        });

        revalidatePath('/');
        revalidatePath('/admin/pages');
        return { success: true };
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Erreur inconnue';
        return { success: false, error: message };
    }
}

/**
 * Update entire content for a file/locale
 */
export async function updateSiteContentAction(
    fileKey: string,
    locale: string,
    content: string
) {
    try {
        await requireEditor();

        // Validate JSON
        JSON.parse(content);

        await db.siteContent.upsert({
            where: { fileKey_locale: { fileKey, locale } },
            update: { content },
            create: { fileKey, locale, content }
        });

        revalidatePath('/');
        revalidatePath('/admin/pages');
        return { success: true };
    } catch (e: unknown) {
        if (e instanceof SyntaxError) {
            return { success: false, error: 'JSON invalide' };
        }
        const message = e instanceof Error ? e.message : 'Erreur inconnue';
        return { success: false, error: message };
    }
}

// Utility: set a value at a dot-separated path in a nested object
function setNestedValue(obj: Record<string, unknown>, pathStr: string, value: unknown): void {
    const parts = pathStr.split('.');
    let current: Record<string, unknown> = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        const key = isNaN(Number(parts[i])) ? parts[i] : Number(parts[i]);
        if (current[key as string] === undefined) {
            (current as Record<string, unknown>)[key as string] = isNaN(Number(parts[i + 1])) ? {} : [];
        }
        current = current[key as string] as Record<string, unknown>;
    }
    const lastKey = isNaN(Number(parts[parts.length - 1]))
        ? parts[parts.length - 1]
        : Number(parts[parts.length - 1]);
    (current as Record<string, unknown>)[lastKey as string] = value;
}
