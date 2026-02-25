"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, User, Building, Send } from "lucide-react";

interface LeadCaptureData {
    name: string;
    email: string;
    company: string;
    score: number;
}

interface LeadCaptureModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: LeadCaptureData) => void;
    dict: Record<string, unknown>;
    score: number;
}

export default function LeadCaptureModal({ isOpen, onClose, onSubmit, dict, score }: LeadCaptureModalProps) {
    const [formData, setFormData] = useState({ name: "", email: "", company: "" });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const modal = dict.modal as Record<string, string>;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ ...formData, score });
        setIsSubmitted(true);
        setTimeout(() => {
            onClose();
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-primary/95 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-white w-full max-w-lg p-10 relative shadow-2xl overflow-hidden"
            >
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />

                {!isSubmitted ? (
                    <div className="relative z-10">
                        <h2 className="text-3xl font-serif text-primary mb-2 italic">
                            {modal.title}
                        </h2>
                        <p className="text-primary/60 mb-8 font-sans">
                            {modal.subtitle}
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30 group-focus-within:text-secondary transition-colors" />
                                <input
                                    type="text"
                                    required
                                    placeholder={modal.name}
                                    className="w-full bg-primary/5 border-none px-12 py-4 text-primary placeholder:text-primary/30 outline-none ring-1 ring-primary/10 focus:ring-secondary transition-all"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30 group-focus-within:text-secondary transition-colors" />
                                <input
                                    type="email"
                                    required
                                    placeholder={modal.email}
                                    className="w-full bg-primary/5 border-none px-12 py-4 text-primary placeholder:text-primary/30 outline-none ring-1 ring-primary/10 focus:ring-secondary transition-all"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div className="relative group">
                                <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30 group-focus-within:text-secondary transition-colors" />
                                <input
                                    type="text"
                                    required
                                    placeholder={modal.company}
                                    className="w-full bg-primary/5 border-none px-12 py-4 text-primary placeholder:text-primary/30 outline-none ring-1 ring-primary/10 focus:ring-secondary transition-all"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary text-secondary py-5 flex items-center justify-center gap-3 font-bold uppercase tracking-widest hover:bg-secondary hover:text-primary transition-all shadow-xl"
                            >
                                {modal.submit}
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <CheckCircle2 className="w-10 h-10 text-secondary" />
                        </motion.div>
                        <h2 className="text-2xl font-serif text-primary italic mb-2">
                            {modal.success}
                        </h2>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
