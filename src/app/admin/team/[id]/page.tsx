import { getTeamMemberById } from '@/services/team';
import TeamMemberEditor from '@/components/admin/TeamMemberEditor';
import { notFound } from 'next/navigation';

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const member = await getTeamMemberById(id);

    if (!member) {
        notFound();
    }

    return <TeamMemberEditor initialData={member} />;
}
