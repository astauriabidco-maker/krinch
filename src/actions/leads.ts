'use server';

import { db } from '@/lib/db';
import { requireEditor } from '@/lib/security';
import { revalidatePath } from 'next/cache';
import { LeadStatus } from '@prisma/client';

export async function updateLeadStatusAction(leadId: string, status: LeadStatus) {
    try {
        await requireEditor();

        await db.lead.update({
            where: { id: leadId },
            data: { status }
        });

        revalidatePath('/admin/leads');
        return { success: true };
    } catch (error: unknown) {
        console.error("Failed to update lead status:", error);
        return { success: false, error: "Impossible de mettre à jour le statut." };
    }
}

export async function deleteLeadAction(leadId: string) {
    try {
        await requireEditor();

        // QuizResults will cascade delete due to onDelete: Cascade
        await db.lead.delete({
            where: { id: leadId }
        });

        revalidatePath('/admin/leads');
        return { success: true };
    } catch (error: unknown) {
        console.error("Failed to delete lead:", error);
        return { success: false, error: "Impossible de supprimer le lead." };
    }
}
