'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';

export async function updateSettingsAction(formData: any) {
    try {
        const settings = await db.siteSettings.findFirst();

        if (settings) {
            await db.siteSettings.update({
                where: { id: settings.id },
                data: {
                    siteName: formData.siteName,
                    contactEmail: formData.contactEmail,
                    contactPhone: formData.contactPhone,
                    addressFr: formData.addressFr,
                    addressEn: formData.addressEn,
                }
            });
        } else {
            await db.siteSettings.create({
                data: {
                    siteName: formData.siteName,
                    contactEmail: formData.contactEmail,
                    contactPhone: formData.contactPhone,
                    addressFr: formData.addressFr,
                    addressEn: formData.addressEn,
                }
            });
        }

        revalidatePath('/admin/settings');
        return { success: true };
    } catch (error) {
        console.error("Failed to update settings:", error);
        return { success: false, error: "Erreur lors de la mise à jour des paramètres" };
    }
}

export async function createBackupAction() {
    try {
        const dbPath = path.resolve(process.cwd(), 'prisma', 'dev.db');
        const backupDir = path.resolve(process.cwd(), 'prisma', 'backups');

        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupPath = path.join(backupDir, `backup-${timestamp}.db`);

        fs.copyFileSync(dbPath, backupPath);

        console.log(`Backup created at: ${backupPath}`);
        return { success: true, path: backupPath };
    } catch (error) {
        console.error("Backup failed:", error);
        return { success: false, error: "Erreur lors de la création de la sauvegarde" };
    }
}
