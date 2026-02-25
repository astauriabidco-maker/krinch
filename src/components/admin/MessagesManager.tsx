'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { markContactReadAction, deleteContactAction } from '@/actions/contact';
import { Mail, MailOpen, Trash2, ChevronDown, ChevronRight, Loader2 } from 'lucide-react';

interface Message {
    id: string;
    name: string;
    email: string;
    role: string | null;
    company: string | null;
    companySize: string | null;
    subject: string | null;
    message: string;
    newsletter: boolean;
    read: boolean;
    createdAt: string;
}

export default function MessagesManager({ messages }: { messages: Message[] }) {
    const [expanded, setExpanded] = useState<string | null>(null);
    const [loading, setLoading] = useState<string | null>(null);
    const router = useRouter();

    const handleMarkRead = async (id: string) => {
        setLoading(id);
        const result = await markContactReadAction(id);
        if (result.success) {
            toast.success('Marqué comme lu');
            router.refresh();
        }
        setLoading(null);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Supprimer ce message ?')) return;
        setLoading(id);
        const result = await deleteContactAction(id);
        if (result.success) {
            toast.success('Message supprimé');
            router.refresh();
        }
        setLoading(null);
    };

    if (messages.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
                <Mail size={40} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500 font-medium">Aucun message reçu</p>
                <p className="text-slate-400 text-sm mt-1">Les messages du formulaire de contact apparaîtront ici.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {messages.map(msg => {
                const isExpanded = expanded === msg.id;
                const isLoading = loading === msg.id;

                return (
                    <div
                        key={msg.id}
                        className={`bg-white rounded-xl border overflow-hidden transition-all ${msg.read ? 'border-slate-200' : 'border-blue-200 shadow-sm'
                            }`}
                    >
                        {/* Header */}
                        <div
                            onClick={() => {
                                setExpanded(isExpanded ? null : msg.id);
                                if (!msg.read) handleMarkRead(msg.id);
                            }}
                            className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-slate-50 transition-colors"
                        >
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                <div className={`p-2 rounded-lg ${msg.read ? 'bg-slate-100' : 'bg-blue-100'}`}>
                                    {msg.read ? (
                                        <MailOpen size={16} className="text-slate-400" />
                                    ) : (
                                        <Mail size={16} className="text-blue-600" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className={`text-sm truncate ${msg.read ? 'text-slate-700' : 'font-bold text-slate-900'}`}>
                                            {msg.name}
                                        </h3>
                                        {msg.company && (
                                            <span className="text-xs text-slate-400 hidden md:inline">· {msg.company}</span>
                                        )}
                                        {!msg.read && (
                                            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-400 truncate">
                                        {msg.subject ? `${msg.subject} — ` : ''}{msg.message.slice(0, 80)}...
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 ml-4">
                                <span className="text-xs text-slate-400 whitespace-nowrap hidden md:block">
                                    {new Date(msg.createdAt).toLocaleDateString('fr-FR', {
                                        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                                    })}
                                </span>
                                {isExpanded ? <ChevronDown size={16} className="text-slate-400" /> : <ChevronRight size={16} className="text-slate-400" />}
                            </div>
                        </div>

                        {/* Expanded Content */}
                        {isExpanded && (
                            <div className="border-t border-slate-100 px-6 py-5 bg-slate-50/50">
                                <div className="grid md:grid-cols-3 gap-4 mb-4">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Email</p>
                                        <a href={`mailto:${msg.email}`} className="text-sm text-blue-600 hover:underline">{msg.email}</a>
                                    </div>
                                    {msg.role && (
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Poste</p>
                                            <p className="text-sm text-slate-700">{msg.role}</p>
                                        </div>
                                    )}
                                    {msg.companySize && (
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Taille entreprise</p>
                                            <p className="text-sm text-slate-700">{msg.companySize}</p>
                                        </div>
                                    )}
                                </div>

                                {msg.subject && (
                                    <div className="mb-3">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Sujet</p>
                                        <p className="text-sm font-medium text-slate-800">{msg.subject}</p>
                                    </div>
                                )}

                                <div className="mb-4">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Message</p>
                                    <p className="text-sm text-slate-700 whitespace-pre-wrap bg-white p-4 rounded-lg border border-slate-200">
                                        {msg.message}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {msg.newsletter && (
                                            <span className="px-2 py-1 bg-green-50 text-green-600 text-xs font-semibold rounded-full">
                                                ✓ Newsletter opt-in
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => handleDelete(msg.id)}
                                        disabled={isLoading}
                                        className="flex items-center gap-2 px-3 py-1.5 text-xs text-red-500 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                                    >
                                        {isLoading ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
