import { db } from '../lib/db';
import { LeadSchema } from '../lib/schemas';
import { notifyAdmin } from '../lib/notifications';
import { z } from 'zod';

export type CreateLeadDTO = z.infer<typeof LeadSchema>;

/**
 * Crée un nouveau lead et ses résultats de quiz associés.
 * Déclenche une notification admin.
 */
export async function createLead(data: CreateLeadDTO) {
    // 1. Validation approfondie (double check)
    const validated = LeadSchema.parse(data);

    try {
        // 2. Transaction pour Lead + QuizResult
        const result = await db.$transaction(async (tx) => {
            const lead = await tx.lead.create({
                data: {
                    name: validated.name,
                    email: validated.email,
                    phone: validated.phone,
                    company: validated.company,
                    companySize: validated.companySize,
                    serviceInterest: validated.serviceInterest,
                }
            });

            // Si c'est un résultat de quiz, on l'ajoute
            if (validated.answers && validated.score !== undefined) {
                await tx.quizResult.create({
                    data: {
                        leadId: lead.id,
                        scoreValue: validated.score,
                        answersJson: validated.answers
                    }
                });
            }

            return lead;
        });

        // 3. Notification (Asynchrone, ne bloque pas le retour)
        notifyAdmin(result).catch(err => console.error("Failed to notify admin:", err));

        return { success: true, data: result };

    } catch (error) {
        console.error("Error creating lead:", error);
        return { success: false, error: "Impossible de créer le lead." };
    }
}

export async function getLeads() {
    return await db.lead.findMany({
        orderBy: { createdAt: 'desc' },
        include: { quizResults: true } // On récupère aussi les résultats
    });
}
