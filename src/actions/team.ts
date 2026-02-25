'use server'

import { createTeamMember, updateTeamMember, deleteTeamMember } from '@/services/team';
import { requireAdmin } from '@/lib/security';
import { revalidatePath } from 'next/cache';
import { TeamMemberSchema } from '@/lib/schemas';
import { z } from 'zod';

type TeamMemberInput = z.infer<typeof TeamMemberSchema>;

export async function createTeamMemberAction(data: TeamMemberInput) {
    try {
        await requireAdmin();
        const validated = TeamMemberSchema.parse(data);
        await createTeamMember(validated);
        revalidatePath('/admin/team');
        revalidatePath('/about');
        return { success: true };
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Erreur inconnue';
        return { success: false, error: message };
    }
}

export async function updateTeamMemberAction(id: string, data: Partial<TeamMemberInput>) {
    try {
        await requireAdmin();
        const validated = TeamMemberSchema.parse(data);
        await updateTeamMember(id, validated);
        revalidatePath('/admin/team');
        revalidatePath('/about');
        return { success: true };
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Erreur inconnue';
        return { success: false, error: message };
    }
}

export async function deleteTeamMemberAction(id: string) {
    try {
        await requireAdmin();
        await deleteTeamMember(id);
        revalidatePath('/admin/team');
        revalidatePath('/about');
        return { success: true };
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Erreur inconnue';
        return { success: false, error: message };
    }
}
