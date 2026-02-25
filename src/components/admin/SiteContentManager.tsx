'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { importJsonToDbAction, updateSiteContentFieldAction } from '@/actions/site-content';
import {
    ChevronDown, ChevronRight, Download, Loader2,
    Save, Upload, Globe, Search, X
} from 'lucide-react';

interface FileInfo { label: string; emoji: string; desc: string; }
interface GroupedContent { fr?: string; en?: string; frUpdated?: string; enUpdated?: string; }

interface Props {
    grouped: Record<string, GroupedContent>;
    fileLabels: Record<string, FileInfo>;
    hasContent: boolean;
}

export default function SiteContentManager({ grouped, fileLabels, hasContent }: Props) {
    const [importing, setImporting] = useState(false);
    const [expandedFile, setExpandedFile] = useState<string | null>(null);
    const [editLang, setEditLang] = useState<'fr' | 'en'>('fr');
    const [search, setSearch] = useState('');
    const router = useRouter();

    const handleImport = async () => {
        setImporting(true);
        const result = await importJsonToDbAction();
        if (result.success) {
            toast.success(`${result.imported} fichiers importés avec succès !`);
            router.refresh();
        } else {
            toast.error(result.error || 'Erreur');
        }
        setImporting(false);
    };

    const allFileKeys = Object.keys(fileLabels);

    return (
        <div className="space-y-6 relative z-10">
            {/* Import Bar */}
            {!hasContent && (
                <div className="bg-amber-50/80 backdrop-blur-xl border border-amber-200/50 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
                    <div>
                        <h3 className="font-bold text-amber-900 flex items-center gap-2">
                            <Upload size={18} />
                            Import initial requis
                        </h3>
                        <p className="text-sm text-amber-700 mt-1">
                            Importez le contenu des fichiers JSON dans la base de données pour pouvoir l&apos;éditer depuis l&apos;admin.
                        </p>
                    </div>
                    <button
                        onClick={handleImport}
                        disabled={importing}
                        className="bg-gradient-to-r from-amber-600 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-700 hover:to-amber-600 transition-all flex items-center gap-2 disabled:opacity-50 whitespace-nowrap shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                        {importing ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                        {importing ? 'Import en cours...' : 'Importer les fichiers JSON'}
                    </button>
                </div>
            )}

            {hasContent && (
                <>
                    {/* Top controls */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white/60 backdrop-blur-xl p-4 rounded-2xl border border-white shadow-[0_4px_30px_rgb(0,0,0,0.03)]">
                        <div className="flex items-center gap-4">
                            {/* Language toggle */}
                            <div className="flex items-center gap-1 bg-slate-100/50 border border-slate-200/60 rounded-xl p-1.5 shadow-inner">
                                <button
                                    onClick={() => setEditLang('fr')}
                                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${editLang === 'fr' ? 'bg-white text-blue-700 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    🇫🇷 FR
                                </button>
                                <button
                                    onClick={() => setEditLang('en')}
                                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${editLang === 'en' ? 'bg-white text-purple-700 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    🇬🇧 EN
                                </button>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-700">{editLang === 'fr' ? 'Version Française' : 'English Version'}</span>
                                <span className="text-[10px] text-slate-400 font-medium">{Object.keys(grouped).length} fichiers indexés</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            {/* Search */}
                            <div className="relative flex-1 md:w-64 group">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Rechercher un texte..."
                                    className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200/60 bg-white/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 shadow-inner transition-all text-sm font-medium"
                                />
                                {search && <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"><X size={14} /></button>}
                            </div>

                            {/* Re-import */}
                            <button
                                onClick={handleImport}
                                disabled={importing}
                                className="px-4 py-2 bg-white border border-slate-200/60 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm hover:shadow flex items-center gap-2 disabled:opacity-50"
                            >
                                {importing ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                                Ré-importer
                            </button>
                        </div>
                    </div>

                    {/* Files List */}
                    <div className="space-y-4">
                        {allFileKeys.map(fileKey => {
                            const info = fileLabels[fileKey];
                            const data = grouped[fileKey];
                            const content = editLang === 'fr' ? data?.fr : data?.en;
                            const isExpanded = expandedFile === fileKey;

                            if (!data) return (
                                <div key={fileKey} className="bg-white/40 backdrop-blur-sm rounded-2xl border border-slate-200/50 px-6 py-5 opacity-60">
                                    <div className="flex items-center gap-4">
                                        <span className="text-3xl drop-shadow-sm">{info.emoji}</span>
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-lg">{info.label}</h3>
                                            <p className="text-xs text-slate-400 font-medium mt-0.5">Non importé</p>
                                        </div>
                                    </div>
                                </div>
                            );

                            let parsed: any = null;
                            try { parsed = JSON.parse(content || '{}'); } catch { }

                            return (
                                <div key={fileKey} className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                                    <button
                                        onClick={() => setExpandedFile(isExpanded ? null : fileKey)}
                                        className="w-full flex items-center justify-between px-6 py-5 hover:bg-slate-50/50 transition-colors group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-3xl drop-shadow-sm group-hover:scale-110 transition-transform">{info.emoji}</span>
                                            <div className="text-left">
                                                <h3 className="font-bold text-slate-900 text-lg">{info.label}</h3>
                                                <p className="text-xs text-slate-500 font-medium mt-0.5">{info.desc}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-5">
                                            <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                                                {data.frUpdated && `MAJ: ${new Date(editLang === 'fr' ? data.frUpdated : (data.enUpdated || '')).toLocaleDateString('fr-FR')}`}
                                            </span>
                                            <div className={`p-2 rounded-full transition-colors ${isExpanded ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600'}`}>
                                                {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                            </div>
                                        </div>
                                    </button>

                                    {isExpanded && parsed && (
                                        <div className="border-t border-slate-100/60 bg-white/50 px-6 py-6 max-h-[600px] overflow-y-auto">
                                            <ContentEditor
                                                data={parsed}
                                                fileKey={fileKey}
                                                locale={editLang}
                                                search={search}
                                                basePath=""
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}

// Recursive content editor component
function ContentEditor({
    data,
    fileKey,
    locale,
    search,
    basePath,
    depth = 0
}: {
    data: any;
    fileKey: string;
    locale: string;
    search: string;
    basePath: string;
    depth?: number;
}) {
    const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
    const [editingPath, setEditingPath] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    if (data === null || data === undefined) return null;

    const handleSave = async (path: string) => {
        setSaving(true);
        const result = await updateSiteContentFieldAction(fileKey, locale, path, editValue);
        if (result.success) {
            toast.success('Mis à jour !');
            setEditingPath(null);
            router.refresh();
        } else {
            toast.error(result.error || 'Erreur');
        }
        setSaving(false);
    };

    const entries = Object.entries(data);

    return (
        <div className={`space-y-1 ${depth > 0 ? 'ml-4 pl-4 border-l border-slate-100' : ''}`}>
            {entries.map(([key, value]) => {
                const fullPath = basePath ? `${basePath}.${key}` : key;
                const isObj = typeof value === 'object' && value !== null && !Array.isArray(value);
                const isArr = Array.isArray(value);
                const isLeaf = typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
                const isCollapsed = collapsed[key];

                // Search filter
                if (search) {
                    const strValue = JSON.stringify(value).toLowerCase();
                    if (!strValue.includes(search.toLowerCase()) && !fullPath.toLowerCase().includes(search.toLowerCase())) {
                        return null;
                    }
                }

                if (isLeaf) {
                    const strVal = String(value);
                    const isEditing = editingPath === fullPath;
                    const isLongText = strVal.length > 100;

                    return (
                        <div key={key} className="group flex items-start gap-2 py-1.5 px-2 rounded-lg hover:bg-slate-50 transition">
                            <span className="text-[11px] font-mono font-bold text-slate-400 shrink-0 mt-1 min-w-[100px]">{key}</span>
                            {isEditing ? (
                                <div className="flex-1 space-y-2">
                                    {isLongText ? (
                                        <textarea
                                            value={editValue}
                                            onChange={e => setEditValue(e.target.value)}
                                            rows={4}
                                            className="w-full px-2 py-1.5 text-sm rounded border border-blue-300 focus:ring-1 focus:ring-blue-500 outline-none"
                                        />
                                    ) : (
                                        <input
                                            value={editValue}
                                            onChange={e => setEditValue(e.target.value)}
                                            className="w-full px-2 py-1.5 text-sm rounded border border-blue-300 focus:ring-1 focus:ring-blue-500 outline-none"
                                        />
                                    )}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleSave(fullPath)}
                                            disabled={saving}
                                            className="px-2 py-1 bg-blue-600 text-white text-xs rounded font-medium hover:bg-blue-700 transition flex items-center gap-1 disabled:opacity-50"
                                        >
                                            {saving ? <Loader2 size={11} className="animate-spin" /> : <Save size={11} />}
                                            Sauvegarder
                                        </button>
                                        <button
                                            onClick={() => setEditingPath(null)}
                                            className="px-2 py-1 text-xs text-slate-400 hover:text-slate-600"
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="flex-1 text-sm text-slate-700 cursor-pointer hover:bg-blue-50/50 px-2 py-1 rounded transition"
                                    onClick={() => { setEditingPath(fullPath); setEditValue(strVal); }}
                                    title="Cliquer pour modifier"
                                >
                                    {strVal.length > 200 ? strVal.slice(0, 200) + '...' : strVal}
                                </div>
                            )}
                        </div>
                    );
                }

                if (isObj || isArr) {
                    const childCount = isArr ? (value as any[]).length : Object.keys(value as object).length;
                    return (
                        <div key={key} className="py-1">
                            <button
                                onClick={() => setCollapsed({ ...collapsed, [key]: !isCollapsed })}
                                className="flex items-center gap-2 w-full text-left py-1 px-2 rounded-lg hover:bg-slate-50 transition"
                            >
                                {isCollapsed ?
                                    <ChevronRight size={14} className="text-slate-400 shrink-0" /> :
                                    <ChevronDown size={14} className="text-slate-400 shrink-0" />
                                }
                                <span className="text-[11px] font-mono font-bold text-violet-600">{key}</span>
                                <span className="text-[10px] text-slate-300">
                                    {isArr ? `[${childCount} items]` : `{${childCount} keys}`}
                                </span>
                            </button>
                            {!isCollapsed && (
                                <ContentEditor
                                    data={value}
                                    fileKey={fileKey}
                                    locale={locale}
                                    search={search}
                                    basePath={fullPath}
                                    depth={depth + 1}
                                />
                            )}
                        </div>
                    );
                }

                return null;
            })}
        </div>
    );
}
