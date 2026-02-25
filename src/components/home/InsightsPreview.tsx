"use client";

import { motion } from "framer-motion";
import InsightsCard from "@/components/insights/InsightsCard";
import Link from "next/link";

interface InsightsPreviewProps {
    dict: any;
    locale: string;
    articles?: any[];
}

function getCategoryLabel(cat: string, locale: string): string {
    const labels: Record<string, Record<string, string>> = {
        strategy: { fr: "Stratégie & Leadership", en: "Strategy & Leadership" },
        ia: { fr: "IA RH & Data", en: "HR AI & Data" },
        digital: { fr: "Transformation Digitale", en: "Digital Transformation" },
        hr: { fr: "Ressources Humaines", en: "Human Resources" },
    };
    return labels[cat?.toLowerCase()]?.[locale] || cat;
}

function formatDate(dateStr: string | Date, locale: string): string {
    const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
    return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
        day: 'numeric', month: 'short', year: 'numeric'
    }).format(date);
}

function estimateReadTime(content: string): string {
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return `${Math.max(3, Math.ceil(words / 200))} min read`;
}

export default function InsightsPreview({ dict, locale, articles }: InsightsPreviewProps) {
    // Use DB articles if provided, fallback to dict JSON
    const displayArticles = articles && articles.length > 0
        ? articles.slice(0, 3).map((a: any) => ({
            slug: a.slug,
            category: a.category?.toLowerCase(),
            categoryLabel: getCategoryLabel(a.category, locale),
            image: a.coverImage || `/images/insights/${a.category?.toLowerCase() || 'digital'}.png`,
            title: a.title,
            excerpt: a.summary,
            date: a.publishedAt ? formatDate(a.publishedAt, locale) : '',
            readTime: estimateReadTime(a.content || ''),
        }))
        : (dict.articles || []).slice(0, 3);

    return (
        <section className="py-24 bg-white border-t border-gray-100">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl text-left">
                        <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                            {dict.insights_preview.badge}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif text-primary leading-tight italic">
                            {dict.insights_preview.title}
                        </h2>
                    </div>
                    <Link
                        href={`/${locale}/insights`}
                        className="shrink-0 text-xs font-bold uppercase tracking-widest border-b border-primary/20 hover:border-secondary transition-all pb-1"
                    >
                        {dict.insights_preview.see_all}
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {displayArticles.map((article: any) => (
                        <InsightsCard key={article.slug} article={article} locale={locale} />
                    ))}
                </div>
            </div>
        </section>
    );
}
