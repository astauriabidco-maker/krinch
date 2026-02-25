import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { Toaster } from 'sonner';
import { Inter } from 'next/font/google';
import '../[locale]/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Admin | Krinch & Partners',
    description: 'Panel d\'administration Krinch & Partners',
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <body className={`${inter.className} antialiased`} suppressHydrationWarning>
                <style>{`
                    @keyframes slideIn {
                        from { transform: translateX(-100%); }
                        to { transform: translateX(0); }
                    }
                    .animate-slideIn { animation: slideIn 0.2s ease-out; }
                    
                    /* Custom Scrollbar for a sleek look */
                    ::-webkit-scrollbar {
                        width: 6px;
                    }
                    ::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    ::-webkit-scrollbar-thumb {
                        background: #cbd5e1;
                        border-radius: 10px;
                    }
                    ::-webkit-scrollbar-thumb:hover {
                        background: #94a3b8;
                    }
                `}</style>
                <div className="flex h-screen bg-gradient-to-br from-[#F8FAFC] to-[#EFF2F6] overflow-hidden font-sans text-slate-800">
                    <Toaster position="top-right" richColors />
                    {/* Sidebar - Desktop */}
                    <AdminSidebar className="hidden lg:flex shadow-2xl z-20" />

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                        {/* Decorative background blur */}
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none z-0"></div>
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-50/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none z-0"></div>

                        <AdminHeader />

                        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10">
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}

