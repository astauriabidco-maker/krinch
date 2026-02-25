'use server';

import { db } from '@/lib/db';
import { requireAdmin } from '@/lib/security';
import { revalidatePath } from 'next/cache';
import { BrandSettingsSchema } from '@/lib/schemas';
import { z } from 'zod';

export async function getBrandSettingsAction() {
    try {
        let settings = await db.brandSettings.findUnique({
            where: { id: 'default' }
        });

        if (!settings) {
            settings = await db.brandSettings.create({
                data: { id: 'default' }
            });
        }

        return { success: true, settings };
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Erreur inconnue';
        return { success: false, error: message };
    }
}

export async function updateBrandSettingsAction(data: z.infer<typeof BrandSettingsSchema>) {
    try {
        await requireAdmin();
        const validated = BrandSettingsSchema.parse(data);
        const settings = await db.brandSettings.upsert({
            where: { id: 'default' },
            create: { id: 'default', ...validated },
            update: { ...validated }
        });

        revalidatePath('/');
        return { success: true, settings };
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Erreur inconnue';
        return { success: false, error: message };
    }
}
