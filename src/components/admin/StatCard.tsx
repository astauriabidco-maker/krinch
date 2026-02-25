'use client';

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface StatCardProps {
    label: string;
    value: string | number;
    iconName: 'Users' | 'FileText' | 'Target' | 'Mail' | 'Newspaper';
    trend?: string;
    trendUp?: boolean;
    delay?: number;
}

export function StatCard({ label, value, iconName, trend, trendUp, delay = 0 }: StatCardProps) {
    const icons = {
        Users: require('lucide-react').Users,
        FileText: require('lucide-react').FileText,
        Target: require('lucide-react').Target,
        Mail: require('lucide-react').Mail,
        Newspaper: require('lucide-react').Newspaper,
    };

    const Icon = icons[iconName];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay, ease: "easeOut" }}
            className="group bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
        >
            {/* Subtle gradient background effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-transparent to-amber-500/0 group-hover:from-amber-500/[0.03] group-hover:to-blue-500/[0.03] transition-colors duration-500" />

            <div className="relative z-10 flex items-start justify-between">
                <div>
                    <p className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">{label}</p>
                    <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</h3>
                    {trend && (
                        <div className="mt-3 flex items-center gap-2">
                            <span className={cn("text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1", trendUp ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700")}>
                                {trendUp ? "↑" : "↓"} {trend}
                            </span>
                            <span className="text-xs text-slate-400 font-medium">vs mois dernier</span>
                        </div>
                    )}
                </div>
                <div className="p-3.5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl text-slate-700 border border-slate-200/50 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Icon size={24} strokeWidth={2.5} />
                </div>
            </div>
        </motion.div>
    );
}
