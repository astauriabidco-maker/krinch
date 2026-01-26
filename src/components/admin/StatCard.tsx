import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
}

export function StatCard({ label, value, icon: Icon, trend, trendUp }: StatCardProps) {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
                <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
                {trend && (
                    <p className={cn("text-xs mt-2 font-medium flex items-center", trendUp ? "text-emerald-600" : "text-rose-600")}>
                        {trendUp ? "↑" : "↓"} {trend} <span className="text-slate-400 ml-1 font-normal">vs mois dernier</span>
                    </p>
                )}
            </div>
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                <Icon size={24} />
            </div>
        </div>
    );
}
