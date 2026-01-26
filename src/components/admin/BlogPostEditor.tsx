'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { createBlogPostAction, updateBlogPostAction } from '@/actions';
import { Loader2, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BlogPostEditor({ initialData }: { initialData?: any }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState({
        titleFr: initialData?.titleFr || '',
        titleEn: initialData?.titleEn || '',
        slug: initialData?.slug || '',
        category: initialData?.category || 'STRATEGY',
        summaryFr: initialData?.summaryFr || '',
        summaryEn: initialData?.summaryEn || '',
        contentFr: initialData?.contentFr || '',
        contentEn: initialData?.contentEn || ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const result = initialData?.id
            ? await updateBlogPostAction(initialData.id, formData)
            : await createBlogPostAction(formData);

        if (result.success) {
            toast.success(initialData?.id ? "Article mis à jour !" : "Article publié avec succès !");
            router.push('/admin/blog');
            router.refresh();
        } else {
            toast.error(result.error || "Une erreur est survenue");
        }
        setLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">{initialData?.id ? "Modifier l'Article" : "Nouvel Article"}</h1>
                    <p className="text-slate-500">{initialData?.id ? "Mettez à jour votre contenu bilingue." : "Rédigez votre contenu en FR et EN."}</p>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    {initialData?.id ? "Enregistrer" : "Publier"}
                </button>
            </div>

            {/* Meta Section */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 grid grid-cols-2 gap-6">
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Slug URL</label>
                    <input
                        name="slug"
                        required
                        value={formData.slug}
                        onChange={handleChange}
                        placeholder="ex: strategie-ia-cameroun"
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Catégorie</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white"
                    >
                        <option value="STRATEGY">Stratégie</option>
                        <option value="IA">Intelligence Artificielle</option>
                        <option value="DIGITAL">Digital</option>
                        <option value="HR">Ressources Humaines</option>
                    </select>
                </div>
            </div>

            {/* Bilingual Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* French Column */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-700 rounded">FR</span>
                        <span className="text-sm font-semibold text-slate-700">Version Française</span>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Titre</label>
                        <input
                            name="titleFr"
                            required
                            value={formData.titleFr}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Résumé (SEO)</label>
                        <textarea
                            name="summaryFr"
                            required
                            rows={3}
                            value={formData.summaryFr}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Contenu (HTML/Markdown)</label>
                        <textarea
                            name="contentFr"
                            required
                            rows={15}
                            value={formData.contentFr}
                            onChange={handleChange}
                            placeholder="<p>Votre contenu ici...</p>"
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                        />
                    </div>
                </div>

                {/* English Column */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold px-2 py-1 bg-purple-100 text-purple-700 rounded">EN</span>
                        <span className="text-sm font-semibold text-slate-700">English Version</span>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Title</label>
                        <input
                            name="titleEn"
                            required
                            value={formData.titleEn}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Summary (SEO)</label>
                        <textarea
                            name="summaryEn"
                            required
                            rows={3}
                            value={formData.summaryEn}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Content (HTML/Markdown)</label>
                        <textarea
                            name="contentEn"
                            required
                            rows={15}
                            value={formData.contentEn}
                            onChange={handleChange}
                            placeholder="<p>Your content here...</p>"
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none font-mono text-sm"
                        />
                    </div>
                </div>

            </div>
        </form>
    );
}
