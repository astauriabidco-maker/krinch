'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Save, Loader2 } from 'lucide-react';
import { updateSettingsAction } from '@/app/admin/settings/actions';

export default function SettingsForm({ initialData }: { initialData: any }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        siteName: initialData?.siteName || 'Krinch & Partners',
        contactEmail: initialData?.contactEmail || 'contact@krinch.com',
        contactPhone: initialData?.contactPhone || '',
        addressFr: initialData?.addressFr || '',
        addressEn: initialData?.addressEn || ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const result = await updateSettingsAction(formData);
        if (result.success) {
            toast.success("Paramètres mis à jour avec succès !");
        } else {
            toast.error(result.error || "Une erreur est survenue");
        }
        setLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-slate-200 space-y-6 max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nom du Site</label>
                    <input
                        name="siteName"
                        value={formData.siteName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email de Contact</label>
                    <input
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Téléphone</label>
                    <input
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
                <h4 className="text-sm font-semibold text-slate-900 mb-4">Adresses</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Adresse (FR)</label>
                        <input
                            name="addressFr"
                            value={formData.addressFr}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Address (EN)</label>
                        <input
                            name="addressEn"
                            value={formData.addressEn}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Enregistrer
                </button>
            </div>
        </form>
    );
}
