'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { deleteBlogPostAction, toggleBlogPostPublishedAction } from '@/actions';
import { Pencil, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';

interface BlogPostActionsProps {
    postId: string;
    published: boolean;
}

export default function BlogPostActions({ postId, published }: BlogPostActionsProps) {
    const [loading, setLoading] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const router = useRouter();

    const handleTogglePublish = async () => {
        setLoading(true);
        const result = await toggleBlogPostPublishedAction(postId, !published);
        if (result.success) {
            toast.success(published ? "Article dépublié" : "Article publié !");
            router.refresh();
        } else {
            toast.error(result.error || "Erreur lors de la mise à jour");
        }
        setLoading(false);
    };

    const handleDelete = async () => {
        setLoading(true);
        const result = await deleteBlogPostAction(postId);
        if (result.success) {
            toast.success("Article supprimé avec succès");
            router.refresh();
        } else {
            toast.error(result.error || "Erreur lors de la suppression");
        }
        setShowDeleteConfirm(false);
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-end gap-1">
            {/* Toggle Publish */}
            <button
                onClick={handleTogglePublish}
                disabled={loading}
                title={published ? "Dépublier" : "Publier"}
                className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${published
                        ? 'text-amber-600 hover:bg-amber-50'
                        : 'text-green-600 hover:bg-green-50'
                    }`}
            >
                {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                ) : published ? (
                    <EyeOff size={16} />
                ) : (
                    <Eye size={16} />
                )}
            </button>

            {/* Edit */}
            <Link
                href={`/admin/blog/${postId}`}
                className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                title="Modifier"
            >
                <Pencil size={16} />
            </Link>

            {/* Delete */}
            <div className="relative">
                <button
                    onClick={() => setShowDeleteConfirm(true)}
                    disabled={loading}
                    title="Supprimer"
                    className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                    <Trash2 size={16} />
                </button>

                {/* Delete Confirmation Popover */}
                {showDeleteConfirm && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setShowDeleteConfirm(false)}
                        />
                        {/* Popover */}
                        <div className="absolute right-0 top-full mt-2 z-50 bg-white border border-slate-200 rounded-xl shadow-xl p-4 w-64">
                            <p className="text-sm font-semibold text-slate-900 mb-1">
                                Confirmer la suppression
                            </p>
                            <p className="text-xs text-slate-500 mb-4">
                                Cette action est irréversible. L&apos;article sera définitivement supprimé.
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={loading}
                                    className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
                                >
                                    {loading && <Loader2 size={12} className="animate-spin" />}
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
