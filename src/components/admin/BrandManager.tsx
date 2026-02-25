'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getBrandSettingsAction, updateBrandSettingsAction } from '@/actions/brand';
import { Image as ImageIcon, Loader2, Save, Palette, Type, Navigation, Link as LinkIcon } from 'lucide-react';

export default function BrandManager() {
    const [settings, setSettings] = useState({
        primaryColor: '#0F2A44',
        secondaryColor: '#D4AF37',
        accentColor: '#F5A21D',
        logoUrl: '',
        fontFamily: 'Inter',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function load() {
            setLoading(true);
            const res = await getBrandSettingsAction();
            if (res.success && res.settings) {
                setSettings({
                    ...res.settings,
                    logoUrl: res.settings.logoUrl || '',
                });
            }
            setLoading(false);
        }
        load();
    }, []);

    const handleChange = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const res = await updateBrandSettingsAction(settings);
        if (res.success) {
            toast.success('Marque mise à jour !');
        } else {
            toast.error(res.error || 'Erreur de sauvegarde');
        }
        setSaving(false);
    };

    return (
        <div className="space-y-8 relative z-10 w-full max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Design & Marque</h1>
                <p className="text-slate-500 mt-1 font-medium">Personnalisez l&apos;identité visuelle de votre site (Couleurs, Logo, Police).</p>
            </div>

            {loading ? (
                <div className="h-64 flex items-center justify-center">
                    <Loader2 className="animate-spin text-amber-500 w-8 h-8" />
                </div>
            ) : (
                <form onSubmit={handleSave} className="bg-white/80 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8 space-y-10">

                    {/* Section Couleurs */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Palette size={20} /></div>
                            <h2 className="text-xl font-bold text-slate-800">Couleurs du Site</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Primary */}
                            <div className="space-y-3">
                                <label className="block text-sm font-semibold text-slate-700">Couleur Primaire (Fonds, Entêtes)</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={settings.primaryColor}
                                        onChange={e => handleChange('primaryColor', e.target.value)}
                                        className="h-12 w-16 p-1 rounded cursor-pointer border-0 bg-transparent"
                                    />
                                    <input
                                        type="text"
                                        value={settings.primaryColor}
                                        onChange={e => handleChange('primaryColor', e.target.value)}
                                        className="flex-1 px-4 py-2 border border-slate-200 rounded-xl font-mono text-sm uppercase bg-slate-50"
                                    />
                                </div>
                            </div>

                            {/* Secondary */}
                            <div className="space-y-3">
                                <label className="block text-sm font-semibold text-slate-700">Couleur Secondaire (Titres, accents)</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={settings.secondaryColor}
                                        onChange={e => handleChange('secondaryColor', e.target.value)}
                                        className="h-12 w-16 p-1 rounded cursor-pointer border-0 bg-transparent"
                                    />
                                    <input
                                        type="text"
                                        value={settings.secondaryColor}
                                        onChange={e => handleChange('secondaryColor', e.target.value)}
                                        className="flex-1 px-4 py-2 border border-slate-200 rounded-xl font-mono text-sm uppercase bg-slate-50"
                                    />
                                </div>
                            </div>

                            {/* Accent */}
                            <div className="space-y-3">
                                <label className="block text-sm font-semibold text-slate-700">Accent (Boutons, Appels à l'action)</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={settings.accentColor}
                                        onChange={e => handleChange('accentColor', e.target.value)}
                                        className="h-12 w-16 p-1 rounded cursor-pointer border-0 bg-transparent"
                                    />
                                    <input
                                        type="text"
                                        value={settings.accentColor}
                                        onChange={e => handleChange('accentColor', e.target.value)}
                                        className="flex-1 px-4 py-2 border border-slate-200 rounded-xl font-mono text-sm uppercase bg-slate-50"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section Identité (Logo / Police) */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><ImageIcon size={20} /></div>
                            <h2 className="text-xl font-bold text-slate-800">Identité & Médias</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="block text-sm font-semibold text-slate-700">URL du Logo</label>
                                <p className="text-xs text-slate-400 mb-2">Collez l'URL de votre logo ici (obtenue depuis la Médiathèque)</p>
                                <input
                                    type="text"
                                    value={settings.logoUrl || ''}
                                    onChange={e => handleChange('logoUrl', e.target.value)}
                                    placeholder="/uploads/logo.png"
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500/20"
                                />
                                {settings.logoUrl && (
                                    <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 inline-block">
                                        <img src={settings.logoUrl} alt="Logo Preview" className="h-12 object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3">
                                <label className="block text-sm font-semibold text-slate-700">Police Principale (Google Fonts)</label>
                                <select
                                    value={settings.fontFamily}
                                    onChange={e => handleChange('fontFamily', e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500/20 bg-white"
                                >
                                    <option value="Inter">Inter (Moderne, Épurée)</option>
                                    <option value="Roboto">Roboto (Classique Google)</option>
                                    <option value="Montserrat">Montserrat (Large, Géométrique)</option>
                                    <option value="Playfair Display">Playfair Display (Serif, Luxe)</option>
                                    <option value="Poppins">Poppins (Arrondie, Dynamique)</option>
                                </select>

                                <div className="mt-6 p-6 rounded-xl border border-slate-200 shadow-sm" style={{ fontFamily: settings.fontFamily }}>
                                    <h3 className="text-lg font-bold mb-2">Aperçu Typographique</h3>
                                    <p className="text-sm">Voici à quoi ressemble votre texte de contenu principal avec cette police. Elle sera appliquée à l'ensemble du site public.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-6 border-t border-slate-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-gradient-to-r from-amber-600 to-amber-500 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"
                        >
                            {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                            {saving ? 'Sauvegarde...' : 'Sauvegarder le Design'}
                        </button>
                    </div>

                </form>
            )}
        </div>
    );
}
