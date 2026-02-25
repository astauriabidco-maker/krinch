'use client';

import { Search, UserCircle, Bell } from 'lucide-react';
import { MobileSidebarToggle } from './AdminSidebar';

export function AdminHeader() {
    return (
        <header className="h-20 bg-white/60 backdrop-blur-2xl border-b border-white shadow-[0_4px_30px_rgba(0,0,0,0.03)] flex items-center justify-between px-6 md:px-10 sticky top-0 z-30 transition-all">
            <div className="flex items-center gap-4">
                {/* Mobile Sidebar Toggle */}
                <MobileSidebarToggle />

                {/* Search Bar - Premium look */}
                <div className="relative w-72 md:w-[400px] hidden sm:block group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Rechercher partout..."
                        className="w-full pl-12 pr-4 py-2.5 rounded-full border border-slate-200/60 bg-white/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 focus:bg-white shadow-inner shadow-slate-50/50 transition-all text-sm text-slate-700 placeholder:text-slate-400 font-medium"
                    />
                </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-5 md:gap-8 ml-auto">
                {/* Health Check */}
                <div className="hidden md:flex items-center gap-2.5 px-4 py-2 bg-emerald-50/50 rounded-full border border-emerald-100/50 shadow-sm">
                    <div className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </div>
                    <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-700">Système En Ligne</span>
                </div>

                {/* Notifications */}
                <button className="relative p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors hidden sm:block">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-amber-500 rounded-full border-2 border-white"></span>
                </button>

                {/* User Menu */}
                <div className="flex items-center gap-4 border-l border-slate-200/60 pl-5 md:pl-8">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-slate-900 leading-tight">Admin Principal</p>
                        <p className="text-[11px] font-semibold text-amber-600 uppercase tracking-widest mt-0.5">Superviseur</p>
                    </div>
                    <button className="relative h-11 w-11 bg-gradient-to-tr from-slate-100 to-slate-50 border border-slate-200 shadow-sm rounded-full flex items-center justify-center text-slate-600 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all outline-none">
                        <UserCircle size={24} className="text-slate-700" />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                    </button>
                </div>
            </div>
        </header>
    );
}
