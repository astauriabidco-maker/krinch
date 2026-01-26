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
                <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
                    <Toaster position="top-right" richColors />
                    {/* Sidebar */}
                    <AdminSidebar className="hidden lg:flex" />

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col h-full overflow-hidden">
                        <AdminHeader />

                        <main className="flex-1 overflow-y-auto p-8">
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}
