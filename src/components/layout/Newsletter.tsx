"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { subscribeNewsletterAction } from "@/actions/newsletter";

interface NewsletterProps {
    dict: any;
    variant?: "minimal" | "full";
}

export default function Newsletter({ dict, variant = "minimal" }: NewsletterProps) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
    const n = dict.newsletter;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setStatus("loading");

        const result = await subscribeNewsletterAction(email);

        if (result.success) {
            setStatus("success");
            setEmail("");
        } else {
            setStatus("idle");
        }
    };

    return (
        <div className={`w-full ${variant === "full" ? "bg-primary p-12 text-white" : ""}`}>
            <AnimatePresence mode="wait">
                {status === "success" ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-3 text-secondary font-sans font-bold"
                    >
                        <CheckCircle2 size={20} />
                        <span>{dict.newsletter_success || "Merci !"}</span>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        {variant === "full" && (
                            <div className="mb-4">
                                <h3 className="text-2xl font-serif mb-2 italic">{n.title}</h3>
                                <p className="text-white/60 text-sm font-sans">{n.description}</p>
                            </div>
                        )}
                        <div className="relative group">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={n.placeholder}
                                className={`w-full bg-transparent border-b ${variant === "full" ? "border-white/20 focus:border-secondary" : "border-primary/20 focus:border-primary"
                                    } py-3 pr-12 text-sm font-sans transition-all outline-none placeholder:opacity-50`}
                            />
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 ${variant === "full" ? "text-secondary hover:text-white" : "text-primary hover:text-secondary"
                                    } transition-all disabled:opacity-50`}
                            >
                                {status === "loading" ? (
                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Send size={18} strokeWidth={2} />
                                )}
                            </button>
                        </div>
                        {variant === "minimal" && (
                            <p className="text-[10px] text-primary/40 uppercase tracking-widest font-bold">
                                {n.description}
                            </p>
                        )}
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}
