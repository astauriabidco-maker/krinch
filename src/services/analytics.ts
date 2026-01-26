import { db } from '@/lib/db';
import { startOfMonth, subMonths, format } from 'date-fns';
import { fr } from 'date-fns/locale';

export async function getAnalyticsData() {
    // 1. Growth: Leads sur les 6 derniers mois
    const sixMonthsAgo = startOfMonth(subMonths(new Date(), 5));

    const leads = await db.lead.findMany({
        where: { createdAt: { gte: sixMonthsAgo } },
        select: { createdAt: true, serviceInterest: true }
    });

    // Group by Month
    const growthMap = new Map<string, number>();
    // Pre-fill last 6 months to avoid holes
    for (let i = 0; i < 6; i++) {
        const d = subMonths(new Date(), i);
        const k = format(d, 'MMM yyyy', { locale: fr });
        growthMap.set(k, 0);
    }

    leads.forEach((l: { createdAt: Date }) => {
        const k = format(l.createdAt, 'MMM yyyy', { locale: fr });
        growthMap.set(k, (growthMap.get(k) || 0) + 1);
    });

    // Re-sort chronologically (map keys might not be ordered) - converting to array reversed
    const growthData = Array.from(growthMap.entries())
        .map(([date, count]) => ({ date, count }))
        .reverse();

    // 2. Sectors Distribution
    const sectorMap = new Map<string, number>();
    leads.forEach((l: { serviceInterest: string | null }) => {
        const sector = l.serviceInterest || 'Autre';
        sectorMap.set(sector, (sectorMap.get(sector) || 0) + 1);
    });

    const sectorData = Array.from(sectorMap.entries())
        .map(([name, value]) => ({ name, value }));

    return { growthData, sectorData };
}
