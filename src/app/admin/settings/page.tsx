import { db } from '@/lib/db';
import BackupButton from './BackupButton';
import SettingsForm from '@/components/admin/settings/SettingsForm';
import { Database, ShieldCheck } from 'lucide-react';

export default async function SettingsPage() {
    const settings = await db.siteSettings.findFirst();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Paramètres Généraux</h1>
                <p className="text-slate-500">Configuration globale du cabinet et du système.</p>
            </div>

            <SettingsForm initialData={settings} />

            {/* System Actions Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-red-50 border border-red-100 p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-4 text-red-800">
                        <Database size={20} />
                        <h3 className="font-bold">Zone de Danger / Base de Données</h3>
                    </div>
                    <p className="text-sm text-red-600 mb-4">Sauvegardez vos données avant toute intervention majeure.</p>
                    <BackupButton />
                </div>

                <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-4 text-blue-800">
                        <ShieldCheck size={20} />
                        <h3 className="font-bold">Sécurité & Accès</h3>
                    </div>
                    <p className="text-sm text-blue-600 mb-4">Gérez les admins et auditeurs du système.</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                        Gérer les Admins
                    </button>
                </div>
            </div>
        </div>
    );
}
