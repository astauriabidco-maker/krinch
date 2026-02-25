'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const EmailSchema = z.string().email('Email invalide');

export async function subscribeNewsletterAction(email: string) {
    try {
        const validated = EmailSchema.parse(email);

        // Check if already subscribed
        const existing = await db.newsletterSubscriber.findUnique({
            where: { email: validated }
        });

        if (existing) {
            if (existing.active) {
                return { success: true, message: 'already_subscribed' };
            }
            // Re-activate
            await db.newsletterSubscriber.update({
                where: { email: validated },
                data: { active: true }
            });
            return { success: true };
        }

        await db.newsletterSubscriber.create({
            data: { email: validated }
        });

        return { success: true };
    } catch (e: unknown) {
        console.error('Newsletter subscription error:', e);
        const message = e instanceof Error ? e.message : "Erreur lors de l'inscription";
        return { success: false, error: message };
    }
}
