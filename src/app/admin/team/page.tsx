import { getTeamMembers } from '@/services/team';
import TeamTable from '@/components/admin/TeamTable';
import Link from 'next/link';
import { Plus, Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function TeamAdminPage() {
    const members = await getTeamMembers();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Équipe & Experts</h1>
                    <p className="text-slate-500">Gérez les collaborateurs affichés sur le site.</p>
                </div>
                <Link
                    href="/admin/team/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center gap-2"
                >
                    <Plus size={18} />
                    <span>Nouveau Membre</span>
                </Link>
            </div>

            <TeamTable members={members} />
        </div>
    );
}
