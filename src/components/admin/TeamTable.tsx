'use client'

import Link from 'next/link';
import { Edit2, Trash2, User } from 'lucide-react';
import { deleteTeamMemberAction } from '@/actions/team';
import { toast } from 'sonner';

export default function TeamTable({ members }: { members: any[] }) {
    const handleDelete = async (id: string) => {
        if (confirm("Voulez-vous vraiment supprimer ce collaborateur ?")) {
            const result = await deleteTeamMemberAction(id);
            if (result.success) {
                toast.success("Collaborateur supprimé !");
            } else {
                toast.error(result.error);
            }
        }
    };

    if (members.length === 0) {
        return (
            <div className="bg-white p-12 text-center rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-500">Aucun membre d'équipe enregistré.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-4 font-semibold text-slate-700">Membre</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Rôle (FR)</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Ordre</th>
                        <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {members.map((member) => (
                        <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                                        {member.photoUrl ? (
                                            <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <User size={20} className="text-slate-400" />
                                        )}
                                    </div>
                                    <span className="font-medium text-slate-900">{member.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-slate-600">{member.roleFr}</td>
                            <td className="px-6 py-4 text-slate-500">{member.order}</td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <Link href={`/admin/team/${member.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                                        <Edit2 size={16} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(member.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
