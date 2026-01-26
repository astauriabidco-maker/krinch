import { getLeads } from '@/services/leads';
import { LeadsTable } from '@/components/admin/LeadsTable';
import { ExportButton } from '@/components/admin/ExportButton';

export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
    const leads = await getLeads();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Gestion des Leads</h1>
                    <p className="text-slate-500">Suivez vos prospects et résultats de diagnostic.</p>
                </div>
                <ExportButton data={leads} filename="krinch_leads_export" />
            </div>

            <LeadsTable leads={leads} />
        </div>
    );
}
