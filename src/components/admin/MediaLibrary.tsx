'use client';

import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { uploadMediaAction, getMediaLibraryAction, deleteMediaAction } from '@/actions/media';
import { UploadCloud, Image as ImageIcon, FileText, Trash2, Copy, Check, Loader2, Video, Search } from 'lucide-react';

export default function MediaLibrary() {
    const [files, setFiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [search, setSearch] = useState('');
    const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const loadFiles = async () => {
        setLoading(true);
        const res = await getMediaLibraryAction();
        if (res.success && res.files) setFiles(res.files);
        else toast.error('Erreur de chargement');
        setLoading(false);
    };

    useEffect(() => { loadFiles(); }, []);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            toast.error("Le fichier dépasse 10MB");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        const res = await uploadMediaAction(formData);
        if (res.success) {
            toast.success('Média uploadé');
            loadFiles();
        } else {
            toast.error(res.error || 'Erreur lors de l\'upload');
        }
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleDelete = async (filename: string) => {
        if (!confirm('Supprimer ce fichier définitivement ?')) return;
        const res = await deleteMediaAction(filename);
        if (res.success) {
            toast.success('Fichier supprimé');
            loadFiles();
        } else {
            toast.error(res.error || 'Erreur');
        }
    };

    const handleCopy = (url: string) => {
        navigator.clipboard.writeText(url);
        setCopiedUrl(url);
        toast.info("Lien copié dans le presse-papier");
        setTimeout(() => setCopiedUrl(null), 2000);
    };

    const formatSize = (bytes: number) => {
        return (bytes / 1024).toFixed(1) + ' KB';
    };

    const filtered = files.filter(f => search ? f.name.toLowerCase().includes(search.toLowerCase()) : true);

    return (
        <div className="space-y-8 relative z-10 w-full">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Médiathèque</h1>
                    <p className="text-slate-500 mt-1 font-medium">Gérez vos images, logos et documents PDF.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            placeholder="Chercher un fichier..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-slate-200/60 bg-white/50 rounded-xl text-sm focus:ring-2 focus:ring-amber-500/20 backdrop-blur-xl transition-all"
                        />
                    </div>

                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all flex items-center gap-2 whitespace-nowrap disabled:opacity-50"
                    >
                        {uploading ? <Loader2 className="animate-spin" size={18} /> : <UploadCloud size={18} />}
                        Envoyer un fichier
                    </button>
                    <input type="file" ref={fileInputRef} className="hidden" onChange={handleUpload} accept="image/*,application/pdf,video/*" />
                </div>
            </div>

            {loading ? (
                <div className="h-64 flex items-center justify-center">
                    <Loader2 className="animate-spin text-amber-500 w-8 h-8" />
                </div>
            ) : filtered.length === 0 ? (
                <div className="bg-white/60 backdrop-blur-xl border border-white border-dashed shadow-sm rounded-2xl h-64 flex flex-col items-center justify-center text-slate-400">
                    <ImageIcon size={48} className="text-slate-200 mb-4" />
                    <p className="font-medium text-slate-500">Aucun média trouvé</p>
                    <p className="text-sm mt-1">Uploadez une image pour commencer</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
                    {filtered.map(f => (
                        <div key={f.name} className="group bg-white/80 backdrop-blur-xl rounded-2xl border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all overflow-hidden flex flex-col h-64 relative">

                            {/* Hover Actions */}
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex gap-2">
                                <button onClick={() => handleCopy(f.url)} className="p-2 bg-white/90 backdrop-blur rounded-lg text-slate-700 hover:text-amber-600 shadow-sm border border-slate-100 transition" title="Copier le lien">
                                    {copiedUrl === f.url ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                                </button>
                                <button onClick={() => handleDelete(f.name)} className="p-2 bg-white/90 backdrop-blur rounded-lg text-rose-500 hover:bg-rose-50 shadow-sm border border-slate-100 transition" title="Supprimer">
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            {/* Thumbnail */}
                            <div className="h-40 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                                {f.type === 'image' ? (
                                    <img src={f.url} alt={f.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                ) : f.type === 'pdf' ? (
                                    <FileText size={48} className="text-rose-400" />
                                ) : (
                                    <Video size={48} className="text-purple-400" />
                                )}
                            </div>

                            {/* Details */}
                            <div className="p-4 flex-1 flex flex-col justify-end bg-gradient-to-t from-white to-white/90">
                                <p className="font-semibold text-slate-800 text-sm truncate" title={f.name}>{f.name}</p>
                                <div className="flex items-center justify-between mt-1 text-xs text-slate-400 font-medium tracking-wide border-t border-slate-100/50 pt-2">
                                    <span className="uppercase">{f.type}</span>
                                    <span>{formatSize(f.size)}</span>
                                </div>
                            </div>

                            {/* Click to copy overlay */}
                            <div
                                className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-amber-600 to-amber-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center text-white font-bold text-xs uppercase tracking-wider cursor-pointer z-10"
                                onClick={() => handleCopy(f.url)}
                            >
                                {copiedUrl === f.url ? 'Copié !' : 'Copier l\'URL'}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
