import { db } from '@/lib/db';
import { TeamMemberSchema } from '@/lib/schemas';
import { z } from 'zod';

export type TeamMemberDTO = z.infer<typeof TeamMemberSchema>;

export async function getTeamMembers() {
    return await db.teamMember.findMany({
        orderBy: { order: 'asc' }
    });
}

export async function getTeamMemberById(id: string) {
    return await db.teamMember.findUnique({
        where: { id }
    });
}

export async function createTeamMember(data: TeamMemberDTO) {
    return await db.teamMember.create({
        data
    });
}

export async function updateTeamMember(id: string, data: Partial<TeamMemberDTO>) {
    return await db.teamMember.update({
        where: { id },
        data
    });
}

export async function deleteTeamMember(id: string) {
    return await db.teamMember.delete({
        where: { id }
    });
}
