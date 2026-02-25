'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { createBlogPostAction, updateBlogPostAction } from '@/actions';
import { Loader2, Save, ArrowLeft, Eye, EyeOff, Image as ImageIcon, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BlogPostEditor({ initialData }: { initialData?: any }) {
    const [loading, setLoading] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const [previewLang, setPreviewLang] = useState<'fr' | 'en'>('fr');
    const router = useRouter();
    const [formData, setFormData] = useState({
        titleFr: initialData?.titleFr || '',
        titleEn: initialData?.titleEn || '',
        slug: initialData?.slug || '',
        category: initialData?.category || 'STRATEGY',
        summaryFr: initialData?.summaryFr || '',
        summaryEn: initialData?.summaryEn || '',
        contentFr: initialData?.contentFr || '',
        contentEn: initialData?.contentEn || '',
        coverImage: initialData?.coverImage || '',
        published: initialData?.published || false,
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
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    // Auto-generate slug from French title
    const generateSlug = () => {
        const slug = formData.titleFr
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
        setFormData({ ...formData, slug });
    };

    // Preview Render
    if (previewMode) {
        const title = previewLang === 'fr' ? formData.titleFr : formData.titleEn;
        const summary = previewLang === 'fr' ? formData.summaryFr : formData.summaryEn;
        const content = previewLang === 'fr' ? formData.contentFr : formData.contentEn;

        return (
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => setPreviewMode(false)}
                        className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Retour à l&apos;édition
                    </button>
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-1">
                        <button
                            onClick={() => setPreviewLang('fr')}
                            className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${previewLang === 'fr' ? 'bg-blue-100 text-blue-700' : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            FR
                        </button>
                        <button
                            onClick={() => setPreviewLang('en')}
                            className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${previewLang === 'en' ? 'bg-purple-100 text-purple-700' : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            EN
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    {/* Cover Image */}
                    {formData.coverImage && (
                        <div className="w-full h-64 bg-slate-100 relative">
                            <img
                                src={formData.coverImage}
                                alt="Cover"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                        </div>
                    )}

                    <div className="p-8 md:p-12">
                        {/* Category Badge */}
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                            ${formData.category === 'IA' ? 'bg-violet-100 text-violet-700' :
                                formData.category === 'DIGITAL' ? 'bg-sky-100 text-sky-700' :
                                    formData.category === 'STRATEGY' ? 'bg-amber-100 text-amber-700' :
                                        'bg-emerald-100 text-emerald-700'}`}>
                            {formData.category}
                        </span>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-6 mb-4 leading-tight">
                            {title || 'Sans titre'}
                        </h1>

                        {/* Summary */}
                        <p className="text-lg text-slate-600 italic border-l-4 border-slate-200 pl-4 mb-8">
                            {summary || 'Pas de résumé'}
                        </p>

                        {/* Content */}
                        <div
                            className="prose prose-slate prose-lg max-w-none
                                prose-headings:font-serif prose-headings:text-slate-900
                                prose-blockquote:border-blue-500 prose-blockquote:italic
                                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                                prose-strong:text-slate-900
                                prose-ul:list-disc prose-ol:list-decimal"
                            dangerouslySetInnerHTML={{ __html: content || '<p class="text-slate-400">Pas de contenu</p>' }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/blog"
                        className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">{initialData?.id ? "Modifier l'Article" : "Nouvel Article"}</h1>
                        <p className="text-slate-500 text-sm">{initialData?.id ? "Mettez à jour votre contenu bilingue." : "Rédigez votre contenu en FR et EN."}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setPreviewMode(true)}
                        className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition flex items-center gap-2"
                    >
                        <Eye size={16} />
                        Aperçu
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        {initialData?.id ? "Enregistrer" : "Publier"}
                    </button>
                </div>
            </div>

            {/* Meta Section */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-6">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Globe size={14} />
                    Métadonnées
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Slug URL</label>
                        <div className="flex gap-2">
                            <input
                                name="slug"
                                required
                                value={formData.slug}
                                onChange={handleChange}
                                placeholder="ex: strategie-ia-cameroun"
                                className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                            />
                            <button
                                type="button"
                                onClick={generateSlug}
                                className="px-3 py-2 text-xs font-medium bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap"
                            >
                                Auto
                            </button>
                        </div>
                    </div>
                    <div>
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

                {/* Cover Image */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                        <ImageIcon size={14} />
                        Image de couverture (URL)
                    </label>
                    <input
                        name="coverImage"
                        value={formData.coverImage}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg ou /images/insights/digital.png"
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                    {formData.coverImage && (
                        <div className="mt-2 rounded-lg overflow-hidden border border-slate-200 h-32 w-48">
                            <img
                                src={formData.coverImage}
                                alt="Aperçu"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* Published Toggle */}
                <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                    <input
                        type="checkbox"
                        name="published"
                        id="published"
                        checked={formData.published}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    />
                    <label htmlFor="published" className="text-sm font-medium text-slate-700 cursor-pointer flex items-center gap-2">
                        {formData.published ? (
                            <>
                                <Eye size={14} className="text-green-600" />
                                <span>Article publié <span className="text-green-600">(visible par le public)</span></span>
                            </>
                        ) : (
                            <>
                                <EyeOff size={14} className="text-slate-400" />
                                <span>Brouillon <span className="text-slate-400">(non visible)</span></span>
                            </>
                        )}
                    </label>
                </div>
            </div>

            {/* Bilingual Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* French Column */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2 sticky top-0 bg-slate-50 py-2 z-10">
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
                        <p className="text-xs text-slate-400 mt-1">{formData.summaryFr.length}/160 caractères recommandés</p>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Contenu (HTML/Markdown)</label>
                        <textarea
                            name="contentFr"
                            required
                            rows={20}
                            value={formData.contentFr}
                            onChange={handleChange}
                            placeholder="<p>Votre contenu ici...</p>"
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                        />
                    </div>
                </div>

                {/* English Column */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2 sticky top-0 bg-slate-50 py-2 z-10">
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
                        <p className="text-xs text-slate-400 mt-1">{formData.summaryEn.length}/160 characters recommended</p>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Content (HTML/Markdown)</label>
                        <textarea
                            name="contentEn"
                            required
                            rows={20}
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
