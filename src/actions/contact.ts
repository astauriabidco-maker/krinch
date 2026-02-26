'use server';

import { db } from '@/lib/db';
import { requireEditor } from '@/lib/security';
import { revalidatePath } from 'next/cache';
import { ContactSchema } from '@/lib/schemas';
import { z } from 'zod';
import { checkRateLimit, rateLimiters } from '@/lib/rate-limit';
import { notifyContactMessage } from '@/lib/notifications';

export async function submitContactAction(data: z.infer<typeof ContactSchema>) {
    try {
        // Rate limit: 5 submissions per 15 minutes
        const rateCheck = await checkRateLimit(rateLimiters.contact);
        if (!rateCheck.success) {
            return { success: false, error: rateCheck.error };
        }

        const validated = ContactSchema.parse(data);

        await db.contactMessage.create({
            data: {
                name: validated.name,
                email: validated.email,
                role: validated.role || null,
                company: validated.company || null,
                companySize: validated.companySize || null,
                subject: validated.subject || null,
                message: validated.message,
                newsletter: validated.newsletter || false,
            }
        });

        // If newsletter opt-in, also subscribe
        if (validated.newsletter) {
            const existing = await db.newsletterSubscriber.findUnique({
                where: { email: validated.email }
            });
            if (!existing) {
                await db.newsletterSubscriber.create({
                    data: { email: validated.email }
                });
            }
        }

        revalidatePath('/admin');

        // Send email notification (async, non-blocking)
        notifyContactMessage({
            name: validated.name,
            email: validated.email,
            subject: validated.subject,
            message: validated.message,
        }).catch(err => console.error('Failed to notify:', err));

        return { success: true };
    } catch (e: unknown) {
        console.error('Contact form error:', e);
        const message = e instanceof Error ? e.message : "Erreur lors de l'envoi du message";
        return { success: false, error: message };
    }
}

export async function getContactMessages() {
    return await db.contactMessage.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export async function markContactReadAction(id: string) {
    try {
        await requireEditor();
        await db.contactMessage.update({
            where: { id },
            data: { read: true }
        });
        revalidatePath('/admin');
        return { success: true };
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Erreur inconnue';
        return { success: false, error: message };
    }
}

export async function deleteContactAction(id: string) {
    try {
        await requireEditor();
        await db.contactMessage.delete({ where: { id } });
        revalidatePath('/admin');
        return { success: true };
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Erreur inconnue';
        return { success: false, error: message };
    }
}
