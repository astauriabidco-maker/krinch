'use client';

import { useState } from 'react';
import { Lead, LeadStatus, QuizResult } from '@prisma/client';
import { toast } from 'sonner';
import { Eye, CheckCircle, Archive, Clock, Trash2, Search, Loader2, X } from 'lucide-react';
import { updateLeadStatusAction, deleteLeadAction } from '@/actions/leads';
import { useRouter } from 'next/navigation';

interface LeadsTableProps {
    leads: (Lead & { quizResults: QuizResult[] })[];
}

const STATUS_CONFIG: Record<string, { label: string; icon: any; color: string; bg: string }> = {
    NEW: { label: 'Nouveau', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
    CONTACTED: { label: 'Contacté', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    ARCHIVED: { label: 'Archivé', icon: Archive, color: 'text-slate-500', bg: 'bg-slate-100' },
};

export function LeadsTable({ leads }: LeadsTableProps) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [expandedLead, setExpandedLead] = useState<string | null>(null);
    const router = useRouter();

    const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
        setLoadingId(leadId);
        const result = await updateLeadStatusAction(leadId, newStatus);
        if (result.success) {
            toast.success(`Statut mis à jour → ${STATUS_CONFIG[newStatus].label}`);
            router.refresh();
        } else {
            toast.error(result.error || "Erreur");
        }
        setLoadingId(null);
    };

    const handleDelete = async (leadId: string) => {
        if (!confirm('Supprimer ce lead et ses résultats de quiz associés ?')) return;
        setLoadingId(leadId);
        const result = await deleteLeadAction(leadId);
        if (result.success) {
            toast.success('Lead supprimé');
            router.refresh();
        } else {
            toast.error(result.error || 'Erreur');
        }
        setLoadingId(null);
    };

    // Filtering
    const filteredLeads = leads
        .filter(l => statusFilter === 'all' || l.status === statusFilter)
        .filter(l => {
            if (!search) return true;
            const q = search.toLowerCase();
            return l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || l.company?.toLowerCase().includes(q) || '';
        });

    const statusCounts = {
        all: leads.length,
        NEW: leads.filter(l => l.status === 'NEW').length,
        CONTACTED: leads.filter(l => l.status === 'CONTACTED').length,
        ARCHIVED: leads.filter(l => l.status === 'ARCHIVED').length,
    };

    return (
        <div className="space-y-4">
            {/* Filters Row */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                {/* Status Tabs */}
                <div className="flex items-center gap-2">
                    {(['all', 'NEW', 'CONTACTED', 'ARCHIVED'] as const).map(s => (
                        <button
                            key={s}
                            onClick={() => setStatusFilter(s)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors
                                ${statusFilter === s
                                    ? s === 'all' ? 'bg-slate-900 text-white' : `${STATUS_CONFIG[s]?.bg} ${STATUS_CONFIG[s]?.color}`
                                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            {s === 'all' ? 'Tous' : STATUS_CONFIG[s].label}
                            <span className="ml-1.5 text-[10px] opacity-60">({statusCounts[s]})</span>
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-72">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Rechercher un lead..."
                        className="w-full pl-9 pr-8 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    {search && (
                        <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                            <X size={14} />
                        </button>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-700">Nom</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Email</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Société</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Intérêt</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Score</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Statut</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredLeads.map(lead => {
                            const cfg = STATUS_CONFIG[lead.status] || STATUS_CONFIG.NEW;
                            const score = lead.quizResults?.[0]?.scoreValue;
                            const isLoading = loadingId === lead.id;

                            return (
                                <tr key={lead.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-slate-900">{lead.name}</td>
                                    <td className="px-6 py-4 text-slate-500 text-xs">{lead.email}</td>
                                    <td className="px-6 py-4 text-slate-600">{lead.company || '—'}</td>
                                    <td className="px-6 py-4">
                                        {lead.serviceInterest && (
                                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600">
                                                {lead.serviceInterest}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {score !== undefined ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${score >= 70 ? 'bg-green-500' : score >= 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                                                        style={{ width: `${score}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-semibold text-slate-600">{score}</span>
                                            </div>
                                        ) : '—'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={lead.status}
                                            onChange={e => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                                            disabled={isLoading}
                                            className={`px-2 py-1 rounded-lg text-xs font-semibold ${cfg.bg} ${cfg.color} border-0 outline-none cursor-pointer disabled:opacity-50`}
                                        >
                                            <option value="NEW">🔵 Nouveau</option>
                                            <option value="CONTACTED">🟢 Contacté</option>
                                            <option value="ARCHIVED">⚪ Archivé</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-400">
                                        {new Date(lead.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}
                                                className="p-1.5 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"
                                                title="Détails"
                                            >
                                                <Eye size={15} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(lead.id)}
                                                disabled={isLoading}
                                                className="p-1.5 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition disabled:opacity-50"
                                                title="Supprimer"
                                            >
                                                {isLoading ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        {filteredLeads.length === 0 && (
                            <tr>
                                <td colSpan={8} className="px-6 py-12 text-center text-slate-400 italic">
                                    {search ? 'Aucun lead trouvé pour cette recherche.' : 'Aucun lead.'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <p className="text-xs text-slate-400 text-right">
                {filteredLeads.length} lead{filteredLeads.length > 1 ? 's' : ''} affiché{filteredLeads.length > 1 ? 's' : ''}
            </p>
        </div>
    );
}
