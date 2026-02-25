'use server';

import { db } from '@/lib/db';
import { requireAdmin } from '@/lib/security';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';
import { z } from 'zod';

const SiteSettingsSchema = z.object({
    siteName: z.string().min(1),
    contactEmail: z.string().email(),
    contactPhone: z.string().optional(),
    addressFr: z.string().optional(),
    addressEn: z.string().optional(),
});

export async function updateSettingsAction(formData: z.infer<typeof SiteSettingsSchema>) {
    try {
        await requireAdmin();

        const validated = SiteSettingsSchema.parse(formData);
        const settings = await db.siteSettings.findFirst();

        if (settings) {
            await db.siteSettings.update({
                where: { id: settings.id },
                data: {
                    siteName: validated.siteName,
                    contactEmail: validated.contactEmail,
                    contactPhone: validated.contactPhone,
                    addressFr: validated.addressFr,
                    addressEn: validated.addressEn,
                }
            });
        } else {
            await db.siteSettings.create({
                data: {
                    siteName: validated.siteName,
                    contactEmail: validated.contactEmail,
                    contactPhone: validated.contactPhone,
                    addressFr: validated.addressFr,
                    addressEn: validated.addressEn,
                }
            });
        }

        revalidatePath('/admin/settings');
        return { success: true };
    } catch (error: unknown) {
        console.error("Failed to update settings:", error);
        const message = error instanceof Error ? error.message : "Erreur lors de la mise à jour des paramètres";
        return { success: false, error: message };
    }
}

export async function createBackupAction() {
    try {
        await requireAdmin();

        const dbPath = path.resolve(process.cwd(), 'prisma', 'dev.db');
        const backupDir = path.resolve(process.cwd(), 'prisma', 'backups');

        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupPath = path.join(backupDir, `backup-${timestamp}.db`);

        fs.copyFileSync(dbPath, backupPath);

        return { success: true, path: backupPath };
    } catch (error: unknown) {
        console.error("Backup failed:", error);
        const message = error instanceof Error ? error.message : "Erreur lors de la création de la sauvegarde";
        return { success: false, error: message };
    }
}
