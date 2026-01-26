'use client';

import { Search, UserCircle, Activity } from 'lucide-react';

export function AdminHeader() {
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
            {/* Search Bar */}
            <div className="relative w-96 hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Rechercher..."
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                />
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-6 ml-auto">

                {/* Health Check */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-medium text-emerald-700">Système OK</span>
                </div>

                {/* User Menu */}
                <div className="flex items-center gap-4 border-l border-slate-100 pl-6">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-slate-800">Admin User</p>
                        <p className="text-xs text-slate-500">Super Admin</p>
                    </div>
                    <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 cursor-pointer hover:bg-slate-200 transition">
                        <UserCircle size={24} />
                    </div>
                </div>
            </div>
        </header>
    );
}
