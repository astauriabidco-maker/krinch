'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FileText,
    PenTool,
    Users,
    Settings,
    LogOut,
    Target
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
    { label: 'Tableau de bord', icon: LayoutDashboard, href: '/admin' },
    { label: 'Contenu Pages', icon: FileText, href: '/admin/pages' },
    { label: 'Insights (Blog)', icon: PenTool, href: '/admin/blog' },
    { label: 'Leads & Quiz', icon: Target, href: '/admin/leads' },
    { label: 'Équipe', icon: Users, href: '/admin/team' },
    { label: 'Paramètres', icon: Settings, href: '/admin/settings' },
];

export function AdminSidebar({ className }: { className?: string }) {
    const pathname = usePathname();

    return (
        <div className={cn("flex flex-col h-full bg-[#0F2A44] text-white w-64", className)}>
            <div className="p-6">
                <h1 className="text-2xl font-bold tracking-tight">Krinch <span className="text-blue-400">Admin</span></h1>
                <p className="text-xs text-slate-400 mt-1">Version 1.0.0</p>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-700">
                <button className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-white/5 rounded-lg text-sm font-medium transition-colors">
                    <LogOut size={18} />
                    Déconnexion
                </button>
            </div>
        </div>
    );
}
