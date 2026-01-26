import { StatCard } from '@/components/admin/StatCard';
import { Users, FileText, Target, Eye } from 'lucide-react';
import { db } from '@/lib/db';
import { getAnalyticsData } from '@/services/analytics';
import { GrowthChart } from '@/components/admin/charts/GrowthChart';
import { SectorPieChart } from '@/components/admin/charts/SectorPieChart';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const [leadsCount, postsCount, teamCount] = await Promise.all([
        db.lead.count(),
        db.blogPost.count(),
        db.teamMember.count(),
    ]);

    const { growthData, sectorData } = await getAnalyticsData();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Tableau de Bord</h1>
                <p className="text-slate-500">Aperçu global de l'activité de Krinch & Partners.</p>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="Total Leads"
                    value={leadsCount}
                    icon={Target}
                    trend="+12%"
                    trendUp={true}
                />
                <StatCard
                    label="Articles Publiés"
                    value={postsCount}
                    icon={FileText}
                />
                <StatCard
                    label="Membres Équipe"
                    value={teamCount}
                    icon={Users}
                />
                <StatCard
                    label="Visites Totales"
                    value="12.5k"
                    icon={Eye}
                    trend="+5%"
                    trendUp={true}
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Croissance des Leads</h3>
                    <GrowthChart data={growthData} />
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Répartition par Intérêt</h3>
                    {sectorData.length > 0 ? (
                        <SectorPieChart data={sectorData} />
                    ) : (
                        <div className="h-[300px] flex items-center justify-center text-slate-400 text-sm italic">
                            Pas assez de données
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
