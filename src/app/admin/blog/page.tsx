import { getPosts } from '@/services/posts';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import BlogPostActions from '@/components/admin/BlogPostActions';
import { BlogPost } from '@prisma/client';

export const dynamic = 'force-dynamic';

export default async function BlogAdminPage() {
    const posts = await getPosts(undefined, true) as BlogPost[];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Articles / Insights</h1>
                    <p className="text-slate-500">Gérez votre contenu éditorial bilingue.</p>
                </div>
                <Link href="/admin/blog/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center gap-2">
                    <Plus size={18} />
                    <span>Nouvel Article</span>
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Articles</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{posts.length}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Publiés</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                        {posts.filter((p: BlogPost) => p.published).length}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Brouillons</p>
                    <p className="text-2xl font-bold text-amber-600 mt-1">
                        {posts.filter((p: BlogPost) => !p.published).length}
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-700">Titre (FR)</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Catégorie</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Statut</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {posts.map((post: BlogPost) => (
                            <tr key={post.id} className="hover:bg-slate-50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-slate-900">{post.titleFr}</span>
                                        <span className="text-xs text-slate-400 mt-0.5">/{post.slug}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold
                                        ${post.category === 'IA' ? 'bg-violet-100 text-violet-700' :
                                            post.category === 'DIGITAL' ? 'bg-sky-100 text-sky-700' :
                                                post.category === 'STRATEGY' ? 'bg-amber-100 text-amber-700' :
                                                    'bg-emerald-100 text-emerald-700'}`}>
                                        {post.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${post.published ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                        {post.published ? '● Publié' : '○ Brouillon'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-500 text-xs">
                                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    }) : '—'}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <BlogPostActions postId={post.id} published={post.published} />
                                </td>
                            </tr>
                        ))}
                        {posts.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-16 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                                            <Plus size={24} className="text-slate-400" />
                                        </div>
                                        <p className="text-slate-500 font-medium">Aucun article créé</p>
                                        <Link href="/admin/blog/new" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                            Créer votre premier article →
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
