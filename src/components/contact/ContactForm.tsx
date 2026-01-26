"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, Send } from "lucide-react";

interface ContactFormProps {
    dict: any;
}

export default function ContactForm({ dict }: ContactFormProps) {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const f = dict.contact_page.form;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1500);
    };

    if (submitted) {
        return (
            <div className="p-12 lg:p-24 flex flex-col items-center justify-center text-center animate-reveal h-full">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-10 text-green-600">
                    <CheckCircle2 size={60} strokeWidth={1} />
                </div>
                <h2 className="text-3xl md:text-5xl font-serif text-primary mb-8 max-w-md">
                    Success!
                </h2>
                <p className="text-lg text-primary/60 font-serif italic mb-12 max-w-lg leading-relaxed">
                    {f.success}
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold uppercase tracking-widest text-primary border-b border-primary pb-2 hover:text-secondary hover:border-secondary transition-all"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <div className="p-8 lg:p-24 bg-white h-full flex flex-col justify-center">
            <div className="max-w-2xl mx-auto w-full">
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-secondary mb-12">
                    {f.title}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="relative group">
                            <input
                                type="text"
                                required
                                className="w-full bg-transparent border-b border-gray-100 py-3 text-sm focus:border-primary outline-none transition-all peer"
                                placeholder=" "
                            />
                            <label className="absolute top-3 left-0 text-sm text-gray-400 group-hover:text-primary pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px]">
                                {f.fields.full_name}
                            </label>
                        </div>
                        <div className="relative group">
                            <input
                                type="text"
                                required
                                className="w-full bg-transparent border-b border-gray-100 py-3 text-sm focus:border-primary outline-none transition-all peer"
                                placeholder=" "
                            />
                            <label className="absolute top-3 left-0 text-sm text-gray-400 group-hover:text-primary pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px]">
                                {f.fields.role}
                            </label>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="relative group">
                            <input
                                type="text"
                                required
                                className="w-full bg-transparent border-b border-gray-100 py-3 text-sm focus:border-primary outline-none transition-all peer"
                                placeholder=" "
                            />
                            <label className="absolute top-3 left-0 text-sm text-gray-400 group-hover:text-primary pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px]">
                                {f.fields.org}
                            </label>
                        </div>
                        <div className="relative group">
                            <input
                                type="email"
                                required
                                className="w-full bg-transparent border-b border-gray-100 py-3 text-sm focus:border-primary outline-none transition-all peer"
                                placeholder=" "
                            />
                            <label className="absolute top-3 left-0 text-sm text-gray-400 group-hover:text-primary pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px]">
                                {f.fields.email}
                            </label>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="relative group">
                            <select className="w-full bg-transparent border-b border-gray-100 py-3 text-sm focus:border-primary outline-none transition-all appearance-none cursor-pointer">
                                {f.subjects.map((sub: string, idx: number) => (
                                    <option key={idx} value={sub}>{sub}</option>
                                ))}
                            </select>
                            <label className="absolute -top-6 left-0 text-[10px] font-bold uppercase tracking-widest text-primary/40">
                                {f.fields.subject}
                            </label>
                            <div className="absolute right-0 top-3 pointer-events-none text-gray-300">
                                <ChevronDown size={16} />
                            </div>
                        </div>
                        <div className="relative group">
                            <select className="w-full bg-transparent border-b border-gray-100 py-3 text-sm focus:border-primary outline-none transition-all appearance-none cursor-pointer">
                                {f.sizes.map((s: string, idx: number) => (
                                    <option key={idx} value={s}>{s}</option>
                                ))}
                            </select>
                            <label className="absolute -top-6 left-0 text-[10px] font-bold uppercase tracking-widest text-primary/40">
                                {f.fields.size}
                            </label>
                            <div className="absolute right-0 top-3 pointer-events-none text-gray-300">
                                <ChevronDown size={16} />
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        <textarea
                            rows={4}
                            required
                            className="w-full bg-transparent border-b border-gray-100 py-3 text-sm focus:border-primary outline-none transition-all peer resize-none"
                            placeholder=" "
                        />
                        <label className="absolute top-3 left-0 text-sm text-gray-400 group-hover:text-primary pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px]">
                            {f.fields.message}
                        </label>
                    </div>

                    <div className="flex items-center gap-4 py-4">
                        <input type="checkbox" id="newsletter" className="w-4 h-4 rounded border-gray-200 text-secondary focus:ring-secondary cursor-pointer" />
                        <label htmlFor="newsletter" className="text-xs text-primary/60 cursor-pointer">
                            {f.fields.opt_in}
                        </label>
                    </div>

                    <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-8">
                        <p className="text-[10px] text-primary/40 leading-relaxed max-w-[200px]">
                            {f.privacy}
                        </p>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full md:w-auto bg-primary text-white border border-primary px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-primary hover:shadow-[0_0_30px_rgba(15,42,68,0.2)] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {loading ? "..." : f.button}
                            {!loading && <Send size={14} />}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
