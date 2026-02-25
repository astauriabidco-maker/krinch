'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { updatePageContentAction, deletePageContentAction } from '@/actions/content';
import { ChevronDown, ChevronRight, Plus, Save, Trash2, Loader2, FileText } from 'lucide-react';

interface ContentItem {
    id: string;
    pageKey: string;
    sectionKey: string;
    key: string;
    contentFr: string;
    contentEn: string;
}

interface Props {
    grouped: Record<string, ContentItem[]>;
    pageLabels: Record<string, string>;
}

export default function PageContentManager({ grouped, pageLabels }: Props) {
    const [expandedPage, setExpandedPage] = useState<string | null>(Object.keys(grouped)[0] || null);
    const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
    const [loading, setLoading] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const router = useRouter();

    // New entry form state
    const [newEntry, setNewEntry] = useState({
        pageKey: '', sectionKey: '', key: '', contentFr: '', contentEn: ''
    });

    const handleSave = async (item: ContentItem) => {
        setLoading(true);
        const result = await updatePageContentAction({
            pageKey: item.pageKey,
            sectionKey: item.sectionKey,
            key: item.key,
            contentFr: item.contentFr,
            contentEn: item.contentEn,
        });
        if (result.success) {
            toast.success('Contenu mis à jour !');
            setEditingItem(null);
            router.refresh();
        } else {
            toast.error(result.error || 'Erreur');
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Supprimer cette entrée ?')) return;
        setLoading(true);
        const result = await deletePageContentAction(id);
        if (result.success) {
            toast.success('Entrée supprimée');
            router.refresh();
        } else {
            toast.error(result.error || 'Erreur');
        }
        setLoading(false);
    };

    const handleAddNew = async () => {
        if (!newEntry.pageKey || !newEntry.sectionKey || !newEntry.key) {
            toast.error('Remplissez tous les champs identifiants');
            return;
        }
        setLoading(true);
        const result = await updatePageContentAction(newEntry);
        if (result.success) {
            toast.success('Contenu ajouté !');
            setShowAddForm(false);
            setNewEntry({ pageKey: '', sectionKey: '', key: '', contentFr: '', contentEn: '' });
            router.refresh();
        } else {
            toast.error(result.error || 'Erreur');
        }
        setLoading(false);
    };

    return (
        <div className="space-y-4">
            {/* Add New Button */}
            <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center gap-2"
            >
                <Plus size={16} />
                Ajouter une entrée
            </button>

            {/* Add New Form */}
            {showAddForm && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-4">
                    <h3 className="text-sm font-bold text-blue-900">Nouvelle Entrée de Contenu</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">Page Key</label>
                            <input
                                value={newEntry.pageKey}
                                onChange={e => setNewEntry({ ...newEntry, pageKey: e.target.value })}
                                placeholder="ex: home"
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">Section Key</label>
                            <input
                                value={newEntry.sectionKey}
                                onChange={e => setNewEntry({ ...newEntry, sectionKey: e.target.value })}
                                placeholder="ex: hero"
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">Key</label>
                            <input
                                value={newEntry.key}
                                onChange={e => setNewEntry({ ...newEntry, key: e.target.value })}
                                placeholder="ex: title"
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-blue-700 mb-1">🇫🇷 Contenu FR</label>
                            <textarea
                                value={newEntry.contentFr}
                                onChange={e => setNewEntry({ ...newEntry, contentFr: e.target.value })}
                                rows={3}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-purple-700 mb-1">🇬🇧 Content EN</label>
                            <textarea
                                value={newEntry.contentEn}
                                onChange={e => setNewEntry({ ...newEntry, contentEn: e.target.value })}
                                rows={3}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleAddNew}
                            disabled={loading}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50"
                        >
                            {loading && <Loader2 size={14} className="animate-spin" />}
                            Créer
                        </button>
                        <button
                            onClick={() => setShowAddForm(false)}
                            className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            )}

            {/* Pages Accordion */}
            {Object.keys(grouped).length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                    <FileText size={40} className="mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500 font-medium">Aucun contenu de page enregistré</p>
                    <p className="text-slate-400 text-sm mt-1">Ajoutez votre première entrée avec le bouton ci-dessus.</p>
                </div>
            ) : (
                Object.entries(grouped).map(([pageKey, items]) => {
                    const isExpanded = expandedPage === pageKey;
                    // Group items by sectionKey
                    const sections: Record<string, ContentItem[]> = {};
                    items.forEach(item => {
                        if (!sections[item.sectionKey]) sections[item.sectionKey] = [];
                        sections[item.sectionKey].push(item);
                    });

                    return (
                        <div key={pageKey} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                            <button
                                onClick={() => setExpandedPage(isExpanded ? null : pageKey)}
                                className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-lg">{pageLabels[pageKey]?.split(' ')[0] || '📄'}</span>
                                    <div className="text-left">
                                        <h3 className="font-bold text-slate-900">
                                            {pageLabels[pageKey] || pageKey}
                                        </h3>
                                        <p className="text-xs text-slate-400">
                                            {items.length} entrée{items.length > 1 ? 's' : ''} · {Object.keys(sections).length} section{Object.keys(sections).length > 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </div>
                                {isExpanded ? <ChevronDown size={18} className="text-slate-400" /> : <ChevronRight size={18} className="text-slate-400" />}
                            </button>

                            {isExpanded && (
                                <div className="border-t border-slate-100 divide-y divide-slate-50">
                                    {Object.entries(sections).map(([sectionKey, sectionItems]) => (
                                        <div key={sectionKey} className="px-6 py-4">
                                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                                                Section: {sectionKey}
                                            </h4>
                                            <div className="space-y-3">
                                                {sectionItems.map(item => {
                                                    const isEditing = editingItem?.id === item.id;
                                                    return (
                                                        <div key={item.id} className="bg-slate-50 rounded-lg p-4">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className="text-xs font-mono font-bold text-slate-600 bg-white px-2 py-1 rounded border">
                                                                    {item.key}
                                                                </span>
                                                                <div className="flex items-center gap-1">
                                                                    {isEditing ? (
                                                                        <>
                                                                            <button
                                                                                onClick={() => handleSave(editingItem!)}
                                                                                disabled={loading}
                                                                                className="p-1.5 rounded text-green-600 hover:bg-green-50 transition disabled:opacity-50"
                                                                            >
                                                                                {loading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                                                                            </button>
                                                                            <button
                                                                                onClick={() => setEditingItem(null)}
                                                                                className="px-2 py-1 text-xs text-slate-500 hover:text-slate-700"
                                                                            >
                                                                                Annuler
                                                                            </button>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <button
                                                                                onClick={() => setEditingItem({ ...item })}
                                                                                className="px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition"
                                                                            >
                                                                                Modifier
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handleDelete(item.id)}
                                                                                className="p-1.5 rounded text-red-400 hover:bg-red-50 transition"
                                                                            >
                                                                                <Trash2 size={13} />
                                                                            </button>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-3">
                                                                <div>
                                                                    <span className="text-[10px] font-bold text-blue-600 uppercase">FR</span>
                                                                    {isEditing ? (
                                                                        <textarea
                                                                            value={editingItem!.contentFr}
                                                                            onChange={e => setEditingItem({ ...editingItem!, contentFr: e.target.value })}
                                                                            rows={2}
                                                                            className="w-full mt-1 px-2 py-1.5 text-sm rounded border border-blue-200 focus:ring-1 focus:ring-blue-500 outline-none"
                                                                        />
                                                                    ) : (
                                                                        <p className="text-sm text-slate-700 mt-1 line-clamp-2">{item.contentFr}</p>
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <span className="text-[10px] font-bold text-purple-600 uppercase">EN</span>
                                                                    {isEditing ? (
                                                                        <textarea
                                                                            value={editingItem!.contentEn}
                                                                            onChange={e => setEditingItem({ ...editingItem!, contentEn: e.target.value })}
                                                                            rows={2}
                                                                            className="w-full mt-1 px-2 py-1.5 text-sm rounded border border-purple-200 focus:ring-1 focus:ring-purple-500 outline-none"
                                                                        />
                                                                    ) : (
                                                                        <p className="text-sm text-slate-700 mt-1 line-clamp-2">{item.contentEn}</p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
}
