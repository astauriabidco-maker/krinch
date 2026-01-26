'use client';

import { useState } from 'react';
import { Lead, LeadStatus, QuizResult } from '@prisma/client';
import { toast } from 'sonner';
import { Eye, FileText, CheckCircle, Archive, Clock } from 'lucide-react';
import { updateLeadStatusAction } from '@/actions/leads';
import { formatDate } from '@/lib/utils'; // Assumed utility, or I'll inline it

// Inline format date if utils missing or just simpler here
const formatDateFr = (date: Date) => new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
});

interface LeadsTableProps {
    leads: (Lead & { quizResults: QuizResult[] })[];
}

export function LeadsTable({ leads }: LeadsTableProps) {
    const [selectedLead, setSelectedLead] = useState<(Lead & { quizResults: QuizResult[] }) | null>(null);
    const [isUpdating, setIsUpdating] = useState<string | null>(null);

    const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
        setIsUpdating(leadId);
        const result = await updateLeadStatusAction(leadId, newStatus);
        setIsUpdating(null);

        if (result.success) {
            toast.success(`Statut mis à jour : ${newStatus}`);
        } else {
            toast.error(result.error || "Erreur lors de la mise à jour");
        }
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-4 font-semibold text-slate-700">Nom / Contact</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Entreprise</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Intérêt</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Score IA</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Statut</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="font-medium text-slate-900">{lead.name}</div>
                                <div className="text-slate-500 text-xs">{lead.email}</div>
                                {lead.phone && <div className="text-slate-400 text-xs">{lead.phone}</div>}
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-slate-800">{lead.company || '-'}</div>
                                <div className="text-slate-400 text-xs">{lead.companySize}</div>
                            </td>
                            <td className="px-6 py-4 text-slate-600">
                                {lead.serviceInterest || 'Général'}
                            </td>
                            <td className="px-6 py-4">
                                {lead.quizResults.length > 0 ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                        {lead.quizResults[0].scoreValue}/100
                                    </span>
                                ) : (
                                    <span className="text-slate-400">-</span>
                                )}
                            </td>
                            <td className="px-6 py-4 text-slate-500 text-xs">
                                {formatDateFr(lead.createdAt)}
                            </td>
                            <td className="px-6 py-4">
                                <select
                                    value={lead.status}
                                    onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                                    disabled={isUpdating === lead.id}
                                    className={`text-xs font-medium px-2 py-1 rounded-full border-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none text-center min-w-[100px]
                    ${lead.status === 'NEW' ? 'bg-orange-100 text-orange-800' : ''}
                    ${lead.status === 'CONTACTED' ? 'bg-blue-100 text-blue-800' : ''}
                    ${lead.status === 'ARCHIVED' ? 'bg-slate-100 text-slate-600' : ''}
                  `}
                                >
                                    <option value="NEW">Nouveau</option>
                                    <option value="CONTACTED">Contacté</option>
                                    <option value="ARCHIVED">Archivé</option>
                                </select>
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => setSelectedLead(lead)}
                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Voir détails"
                                >
                                    <Eye size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {leads.length === 0 && (
                        <tr>
                            <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                                Aucun lead pour le moment.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal Détails */}
            {selectedLead && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedLead(null)}>
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="text-xl font-bold text-slate-900">Détails du Lead</h3>
                            <button onClick={() => setSelectedLead(null)} className="text-slate-400 hover:text-slate-600">Fermer</button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Contact</h4>
                                    <div className="space-y-2">
                                        <p><span className="font-medium">Nom:</span> {selectedLead.name}</p>
                                        <p><span className="font-medium">Email:</span> {selectedLead.email}</p>
                                        <p><span className="font-medium">Tél:</span> {selectedLead.phone || '-'}</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Entreprise</h4>
                                    <div className="space-y-2">
                                        <p><span className="font-medium">Société:</span> {selectedLead.company || '-'}</p>
                                        <p><span className="font-medium">Taille:</span> {selectedLead.companySize || '-'}</p>
                                        <p><span className="font-medium">Secteur:</span> {selectedLead.serviceInterest || '-'}</p>
                                    </div>
                                </div>
                            </div>

                            {selectedLead.quizResults.length > 0 && (
                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                    <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                                        <FileText size={16} className="text-blue-500" />
                                        Résultats Diagnostic IA (Score: {selectedLead.quizResults[0].scoreValue}/100)
                                    </h4>
                                    <pre className="text-xs text-slate-600 whitespace-pre-wrap font-mono bg-white p-3 rounded border border-slate-100 overflow-x-auto">
                                        {JSON.stringify(selectedLead.quizResults[0].answersJson, null, 2)}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
