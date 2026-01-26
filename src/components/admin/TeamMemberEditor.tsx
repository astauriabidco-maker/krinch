'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createTeamMemberAction, updateTeamMemberAction } from '@/actions/team';
import { Loader2, Save, User, Linkedin, Image as ImageIcon } from 'lucide-react';

export default function TeamMemberEditor({ initialData }: { initialData?: any }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        roleFr: initialData?.roleFr || '',
        roleEn: initialData?.roleEn || '',
        bioFr: initialData?.bioFr || '',
        bioEn: initialData?.bioEn || '',
        photoUrl: initialData?.photoUrl || '',
        linkedinUrl: initialData?.linkedinUrl || '',
        order: initialData?.order || 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'number' ? parseInt(value) || 0 : value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const result = initialData?.id
            ? await updateTeamMemberAction(initialData.id, formData)
            : await createTeamMemberAction(formData);

        if (result.success) {
            toast.success(initialData?.id ? "Collaborateur mis à jour !" : "Nouveau collaborateur ajouté !");
            router.push('/admin/team');
            router.refresh();
        } else {
            toast.error(result.error || "Une erreur est survenue");
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8 pb-12">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        {initialData?.id ? "Modifier le Collaborateur" : "Nouveau Collaborateur"}
                    </h1>
                    <p className="text-slate-500">
                        Gérez les informations du membre de l'équipe et ses réseaux.
                    </p>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    {initialData?.id ? "Enregistrer" : "Créer"}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Info Principales */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
                        <h2 className="font-semibold text-slate-900 border-b pb-4 mb-4">Informations Générales</h2>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nom Complet</label>
                            <input
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="ex: Jean Dupont"
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                                    <span className="text-[10px] bg-blue-100 text-blue-700 px-1 rounded font-bold">FR</span>
                                    Rôle (Français)
                                </label>
                                <input
                                    name="roleFr"
                                    required
                                    value={formData.roleFr}
                                    onChange={handleChange}
                                    placeholder="ex: Directeur Associé"
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                                    <span className="text-[10px] bg-purple-100 text-purple-700 px-1 rounded font-bold">EN</span>
                                    Role (English)
                                </label>
                                <input
                                    name="roleEn"
                                    required
                                    value={formData.roleEn}
                                    onChange={handleChange}
                                    placeholder="ex: Partner"
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                                <span className="text-[10px] bg-blue-100 text-blue-700 px-1 rounded font-bold">FR</span>
                                Biographie (Français)
                            </label>
                            <textarea
                                name="bioFr"
                                rows={4}
                                value={formData.bioFr}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                                <span className="text-[10px] bg-purple-100 text-purple-700 px-1 rounded font-bold">EN</span>
                                Bio (English)
                            </label>
                            <textarea
                                name="bioEn"
                                rows={4}
                                value={formData.bioEn}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Media & Settings */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
                        <h2 className="font-semibold text-slate-900 border-b pb-4 mb-4">Profil & Médias</h2>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                                <ImageIcon size={14} /> Photo URL
                            </label>
                            <input
                                name="photoUrl"
                                value={formData.photoUrl}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                            />
                            {formData.photoUrl && (
                                <div className="mt-2 w-full aspect-square rounded-lg border border-slate-100 overflow-hidden bg-slate-50 flex items-center justify-center">
                                    <img src={formData.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                                <Linkedin size={14} /> LinkedIn URL
                            </label>
                            <input
                                name="linkedinUrl"
                                value={formData.linkedinUrl}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/in/..."
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Ordre d'affichage
                            </label>
                            <input
                                type="number"
                                name="order"
                                value={formData.order}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                            />
                            <p className="text-[10px] text-slate-400 mt-1">Plus le nombre est bas, plus il apparaît en premier.</p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
