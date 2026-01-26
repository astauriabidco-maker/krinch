"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

interface InsightsCardProps {
    article: any;
    locale: string;
}

export default function InsightsCard({ article, locale }: InsightsCardProps) {
    const images: Record<string, string> = {
        "ia": "/images/insights/ia-rh.png",
        "digital": "/images/insights/digital.png",
        "strategy": "/images/insights/leadership.png"
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group"
        >
            <Link href={`/${locale}/insights/${article.slug}`}>
                <div className="relative aspect-video mb-6 overflow-hidden bg-primary/5 rounded-sm shadow-sm transition-all group-hover:shadow-2xl">
                    <Image
                        src={article.image || images[article.category] || "/images/insights/digital.png"}
                        alt={`Analyse stratégique RH Afrique : ${article.title} - Expertise Krinch & Partners`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
            </Link>

            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <span className="text-[10px] bg-secondary/10 text-secondary px-3 py-1 rounded-full uppercase tracking-widest font-bold">
                        {article.categoryLabel}
                    </span>
                    <div className="flex items-center gap-1.5 text-primary/40 text-[10px] font-bold uppercase tracking-tighter">
                        <Clock size={12} />
                        {article.readTime}
                    </div>
                </div>

                <Link href={`/${locale}/insights/${article.slug}`} className="block">
                    <h3 className="text-xl font-serif text-primary group-hover:text-secondary transition-colors leading-tight italic">
                        {article.title}
                    </h3>
                </Link>

                <p className="text-sm text-primary/60 font-sans leading-relaxed line-clamp-2">
                    {article.excerpt}
                </p>

                <Link
                    href={`/${locale}/insights/${article.slug}`}
                    className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary hover:text-secondary transition-all"
                >
                    Lire l'analyse
                    <div className="w-8 h-px bg-secondary group-hover:w-12 transition-all" />
                </Link>
            </div>
        </motion.div>
    );
}
