"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, ArrowUpRight } from "lucide-react";

interface InsightsCardProps {
    article: any;
    locale: string;
    variant?: "default" | "featured";
}

const FALLBACK_IMAGES: Record<string, string> = {
    ia: "/images/insights/ia-rh.png",
    digital: "/images/insights/digital.png",
    strategy: "/images/insights/leadership.png",
    hr: "/images/insights/digital.png",
};

export default function InsightsCard({ article, locale, variant = "default" }: InsightsCardProps) {
    const imageUrl = article.image || FALLBACK_IMAGES[article.category] || "/images/insights/digital.png";
    const readLabel = locale === 'fr' ? 'Lire l\'analyse' : 'Read analysis';

    if (variant === "featured") {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group"
            >
                <Link href={`/${locale}/insights/${article.slug}`}>
                    <div className="grid lg:grid-cols-2 gap-0 bg-white border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 rounded-sm">
                        {/* Image */}
                        <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                            <Image
                                src={imageUrl}
                                alt={article.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/10 group-hover:to-transparent transition-all duration-700" />
                            {/* Category badge overlay */}
                            <div className="absolute top-6 left-6">
                                <span className="px-4 py-1.5 bg-secondary text-primary text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-lg">
                                    {article.categoryLabel}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-10 lg:p-16 flex flex-col justify-center">
                            <div className="flex items-center gap-4 mb-6">
                                {article.date && (
                                    <div className="flex items-center gap-1.5 text-primary/40 text-[10px] font-bold uppercase tracking-wider">
                                        <Calendar size={12} />
                                        {article.date}
                                    </div>
                                )}
                                <div className="flex items-center gap-1.5 text-primary/40 text-[10px] font-bold uppercase tracking-wider">
                                    <Clock size={12} />
                                    {article.readTime}
                                </div>
                            </div>

                            <h2 className="text-2xl lg:text-3xl font-serif text-primary group-hover:text-secondary transition-colors leading-tight italic mb-6">
                                {article.title}
                            </h2>

                            <p className="text-primary/60 font-sans leading-relaxed mb-8 line-clamp-3">
                                {article.excerpt}
                            </p>

                            <div className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary group-hover:gap-4 transition-all">
                                {readLabel}
                                <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </Link>
            </motion.div>
        );
    }

    // Default card
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
                        src={imageUrl}
                        alt={article.title}
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
                    {readLabel}
                    <div className="w-8 h-px bg-secondary group-hover:w-12 transition-all" />
                </Link>
            </div>
        </motion.div>
    );
}
