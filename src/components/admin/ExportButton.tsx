'use client';

import { downloadAsCSV } from '@/lib/export';

interface LeadExportItem {
    name: string;
    email: string;
    phone?: string | null;
    company?: string | null;
    companySize?: string | null;
    serviceInterest?: string | null;
    status: string;
    quizResults?: { scoreValue: number }[];
    createdAt: string | Date;
}

export function ExportButton({ data, filename }: { data: LeadExportItem[]; filename: string }) {
    const handleExport = () => {
        if (!data || data.length === 0) return;

        const flatData = data.map((item) => ({
            Nom: item.name,
            Email: item.email,
            Téléphone: item.phone || '',
            Société: item.company || '',
            Taille: item.companySize || '',
            Intérêt: item.serviceInterest || '',
            Statut: item.status,
            Score: item.quizResults?.[0]?.scoreValue || '',
            Date: new Date(item.createdAt).toLocaleDateString('fr-FR'),
        }));

        downloadAsCSV(flatData, filename);
    };

    return (
        <button
            onClick={handleExport}
            className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-200 transition flex items-center gap-2"
        >
            📥 Export CSV
        </button>
    );
}
