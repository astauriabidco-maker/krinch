import { StatCard } from '@/components/admin/StatCard';
import { Users, FileText, Target, Mail, Newspaper } from 'lucide-react';
import { db } from '@/lib/db';
import { getAnalyticsData } from '@/services/analytics';
import { GrowthChart } from '@/components/admin/charts/GrowthChart';
import { SectorPieChart } from '@/components/admin/charts/SectorPieChart';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const [leadsCount, postsCount, teamCount, messagesCount, newsletterCount] = await Promise.all([
        db.lead.count(),
        db.blogPost.count(),
        db.teamMember.count(),
        db.contactMessage.count({ where: { read: false } }),
        db.newsletterSubscriber.count({ where: { active: true } }),
    ]);

    const { growthData, sectorData } = await getAnalyticsData();

    return (
        <div className="space-y-10 relative z-10">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Tableau de Bord</h1>
                <p className="text-slate-500 mt-1 font-medium">Aperçu global de l&apos;activité de <span className="text-amber-600 font-bold">Krinch & Partners</span>.</p>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
                <StatCard
                    label="Total Leads"
                    value={leadsCount}
                    iconName="Target"
                    trend="+12%"
                    trendUp={true}
                    delay={0.1}
                />
                <StatCard
                    label="Articles Publiés"
                    value={postsCount}
                    iconName="FileText"
                    delay={0.2}
                />
                <StatCard
                    label="Membres Équipe"
                    value={teamCount}
                    iconName="Users"
                    delay={0.3}
                />
                <StatCard
                    label="Messages non lus"
                    value={messagesCount}
                    iconName="Mail"
                    delay={0.4}
                />
                <StatCard
                    label="Abonnés Newsletter"
                    value={newsletterCount}
                    iconName="Newspaper"
                    delay={0.5}
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 transition-transform duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                    <h3 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                        Croissance des Leads
                    </h3>
                    <GrowthChart data={growthData} />
                </div>
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 transition-transform duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                    <h3 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
                        Répartition par Intérêt
                    </h3>
                    {sectorData.length > 0 ? (
                        <SectorPieChart data={sectorData} />
                    ) : (
                        <div className="h-[300px] flex items-center justify-center text-slate-400 text-sm italic bg-slate-50/50 rounded-xl border border-slate-100 border-dashed">
                            Pas assez de données pour générer le graphique
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
