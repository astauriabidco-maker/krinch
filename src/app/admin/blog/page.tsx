import { getPosts } from '@/services/posts';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { formatDate } from '@/lib/utils'; // Assumed util

export const dynamic = 'force-dynamic';

export default async function BlogAdminPage() {
    const posts = await getPosts();

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
                        {posts.map((post: any) => (
                            <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-900">{post.titleFr}</td>
                                <td className="px-6 py-4 text-slate-600">{post.category}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${post.published ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                        {post.published ? 'Publié' : 'Brouillon'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-500">{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '-'}</td>
                                <td className="px-6 py-4 text-right">
                                    <Link href={`/admin/blog/${post.id}`} className="text-blue-600 hover:text-blue-800 font-medium">Modifier</Link>
                                </td>
                            </tr>
                        ))}
                        {posts.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">Aucun article publié.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
