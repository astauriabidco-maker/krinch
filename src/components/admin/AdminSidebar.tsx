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
    Target,
    Mail,
    Menu,
    X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { signOut } from 'next-auth/react';

const menuItems = [
    { label: 'Tableau de bord', icon: LayoutDashboard, href: '/admin' },
    { label: 'Contenu Pages', icon: FileText, href: '/admin/pages' },
    { label: 'Insights (Blog)', icon: PenTool, href: '/admin/blog' },
    { label: 'Médiathèque', icon: require('lucide-react').Image, href: '/admin/media' },
    { label: 'Leads & Quiz', icon: Target, href: '/admin/leads' },
    { label: 'Messages', icon: Mail, href: '/admin/messages' },
    { label: 'Équipe', icon: Users, href: '/admin/team' },
    { label: 'Design & Marque', icon: require('lucide-react').Paintbrush, href: '/admin/branding' },
    { label: 'Paramètres', icon: Settings, href: '/admin/settings' },
];

export function AdminSidebar({ className }: { className?: string }) {
    const pathname = usePathname();

    const handleLogout = () => {
        signOut({ callbackUrl: '/login' });
    };

    return (
        <div className={cn("flex flex-col h-full bg-[#0A1628] bg-gradient-to-b from-[#0A1628] to-[#0F2A44] text-white w-72 border-r border-[#1e3a5f]", className)}>
            <div className="p-8 pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-serif font-bold text-[#0A1628] text-lg">
                        K
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-white">Krinch <span className="font-medium text-amber-400">Admin</span></h1>
                        <p className="text-[10px] text-slate-400 font-medium tracking-widest uppercase mt-0.5">Premium Edition</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-1.5 mt-8">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 relative overflow-hidden group",
                                isActive
                                    ? "bg-amber-500/10 text-amber-400"
                                    : "text-slate-400 hover:text-white"
                            )}
                        >
                            {/* Hover glass effect */}
                            {!isActive && (
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors z-0 rounded-xl" />
                            )}

                            {/* Active indicator bar */}
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-amber-400 rounded-r-md blur-[1px]" />
                            )}

                            <item.icon size={20} className={cn("relative z-10 transition-transform duration-300", isActive ? "scale-110" : "group-hover:scale-110")} />
                            <span className="relative z-10">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-[#1e3a5f]/50">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3.5 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl text-sm font-semibold transition-all group relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/5 transition-colors z-0 rounded-xl" />
                    <LogOut size={20} className="relative z-10 group-hover:-translate-x-1 transition-transform" />
                    <span className="relative z-10">Déconnexion</span>
                </button>
            </div>
        </div>
    );
}

// Mobile sidebar toggle button + overlay
export function MobileSidebarToggle() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition"
            >
                <Menu size={22} />
            </button>

            {/* Overlay */}
            {open && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
                    <div className="absolute left-0 top-0 h-full w-64 animate-slideIn">
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-4 right-4 z-10 p-1 text-white/60 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                        <AdminSidebar className="flex" />
                    </div>
                </div>
            )}
        </>
    );
}
