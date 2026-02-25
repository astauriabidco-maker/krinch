'use server';

import { db } from '@/lib/db';
import { requireEditor } from '@/lib/security';
import { revalidatePath } from 'next/cache';
import { PageContentSchema } from '@/lib/schemas';
import { z } from 'zod';

/**
 * @deprecated Use SiteContent (site-content.ts) instead.
 * This PageContent system is kept for backward compatibility but should be migrated.
 */

type PageContentInput = z.infer<typeof PageContentSchema>;

export async function updatePageContentAction(data: PageContentInput) {
    try {
        await requireEditor();
        const validated = PageContentSchema.parse(data);

        await db.pageContent.upsert({
            where: {
                pageKey_sectionKey_key: {
                    pageKey: validated.pageKey,
                    sectionKey: validated.sectionKey,
                    key: validated.key,
                }
            },
            update: {
                contentFr: validated.contentFr,
                contentEn: validated.contentEn,
            },
            create: {
                pageKey: validated.pageKey,
                sectionKey: validated.sectionKey,
                key: validated.key,
                contentFr: validated.contentFr,
                contentEn: validated.contentEn,
            }
        });

        revalidatePath('/admin/pages');
        return { success: true };
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Erreur inconnue';
        return { success: false, error: message };
    }
}

export async function deletePageContentAction(id: string) {
    try {
        await requireEditor();
        await db.pageContent.delete({ where: { id } });
        revalidatePath('/admin/pages');
        return { success: true };
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Erreur inconnue';
        return { success: false, error: message };
    }
}

export async function getAllPageContent() {
    return await db.pageContent.findMany({
        orderBy: [{ pageKey: 'asc' }, { sectionKey: 'asc' }, { key: 'asc' }]
    });
}
