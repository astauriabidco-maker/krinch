'use server'

import { createTeamMember, updateTeamMember, deleteTeamMember } from '../services/team';
import { requireAdmin } from '../lib/security';
import { revalidatePath } from 'next/cache';
import { TeamMemberSchema } from '../lib/schemas';

export async function createTeamMemberAction(data: any) {
    try {
        await requireAdmin();
        const validated = TeamMemberSchema.parse(data);
        await createTeamMember(validated);
        revalidatePath('/admin/team');
        revalidatePath('/about');
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function updateTeamMemberAction(id: string, data: any) {
    try {
        await requireAdmin();
        const validated = TeamMemberSchema.parse(data);
        await updateTeamMember(id, validated);
        revalidatePath('/admin/team');
        revalidatePath('/about');
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function deleteTeamMemberAction(id: string) {
    try {
        await requireAdmin();
        await deleteTeamMember(id);
        revalidatePath('/admin/team');
        revalidatePath('/about');
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
