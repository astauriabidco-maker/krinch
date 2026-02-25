"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InsightsCard from "@/components/insights/InsightsCard";
import Newsletter from "@/components/layout/Newsletter";
import { motion, AnimatePresence } from "framer-motion";
import { Locale } from "@/lib/i18n/get-dictionary";
import { Search } from "lucide-react";

interface Article {
    slug: string;
    category: string;
    categoryLabel?: string;
    image?: string;
    title?: string;
    titleFr?: string;
    titleEn?: string;
    excerpt?: string;
    summary?: string;
    date?: string;
    readTime?: string;
    content?: string;
    coverImage?: string | null;
    publishedAt?: string | Date | null;
    [key: string]: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Dictionary = Record<string, any>;

export default function InsightsPage({ dict, locale, articles }: { dict: Dictionary; locale: Locale; articles?: Article[] }) {
    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    // Use DB articles if available, fall back to JSON dict
    const allArticles = articles && articles.length > 0
        ? articles.map((a: Article) => ({
            slug: a.slug,
            category: a.category?.toLowerCase(),
            categoryLabel: getCategoryLabel(a.category, locale),
            image: a.coverImage || `/images/insights/${a.category?.toLowerCase() || 'digital'}.png`,
            title: a.title,
            excerpt: a.summary,
            date: a.publishedAt ? formatDate(a.publishedAt, locale) : '',
            readTime: estimateReadTime(a.content || ''),
            content: a.content,
        }))
        : dict.articles || [];

    const filteredArticles = allArticles
        .filter((a: Article) => filter === "all" || a.category === filter)
        .filter((a: Article) =>
            searchQuery === "" ||
            a.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const filterKeys = ["all", "digital", "ia", "strategy", "hr"];

    // Featured article = most recent
    const featuredArticle = allArticles[0];
    const restArticles = filteredArticles.length > 0 && filter === "all" && searchQuery === ""
        ? filteredArticles.slice(1)
        : filteredArticles;

    return (
        <main className="min-h-screen bg-[#fcfcfc]">
            <Header locale={locale} dict={dict} />

            {/* Hero Section */}
            <section className="bg-primary pt-48 pb-24 text-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4 block"
                        >
                            Intelligence & Analyses
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-serif mb-8 italic"
                        >
                            {dict.meta.title}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-white/60 text-lg md:text-xl font-sans leading-relaxed max-w-2xl"
                        >
                            {dict.meta.description}
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Featured Article */}
            {featuredArticle && filter === "all" && searchQuery === "" && (
                <section className="py-16 border-b border-gray-100">
                    <div className="container mx-auto px-6">
                        <InsightsCard article={featuredArticle} locale={locale} variant="featured" />
                    </div>
                </section>
            )}

            {/* Filters & Search */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16 border-b border-primary/5 pb-8">
                        {/* Filters */}
                        <div className="flex flex-wrap items-center gap-3">
                            {filterKeys.map((key) => (
                                <button
                                    key={key}
                                    onClick={() => setFilter(key)}
                                    className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${filter === key
                                        ? "bg-secondary text-primary shadow-lg shadow-secondary/20"
                                        : "bg-white border border-gray-100 text-primary/40 hover:border-primary/20"
                                        }`}
                                >
                                    {dict.filter[key] || key.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative w-full md:w-72">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" />
                            <input
                                type="text"
                                placeholder={locale === 'fr' ? 'Rechercher un article...' : 'Search articles...'}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-200 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 min-h-[400px]">
                        <AnimatePresence mode="popLayout">
                            {restArticles.map((article: Article) => (
                                <InsightsCard key={article.slug} article={article} locale={locale} />
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Empty state */}
                    {filteredArticles.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-primary/40 text-lg font-serif italic">
                                {locale === 'fr' ? 'Aucun article trouvé.' : 'No articles found.'}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Integration */}
            <section className="py-24 bg-primary text-white overflow-hidden relative">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-serif italic mb-6">
                                {locale === 'fr' ? 'Restez à la pointe de' : 'Stay ahead of'} <br className="hidden md:block" />
                                {locale === 'fr' ? 'la transformation.' : 'the transformation.'}
                            </h2>
                            <p className="text-white/60 font-sans leading-relaxed max-w-md">
                                {locale === 'fr'
                                    ? 'Rejoignez notre cercle de réflexion et recevez chaque mois nos analyses stratégiques directement dans votre boîte mail.'
                                    : 'Join our think tank and receive our strategic insights directly in your inbox every month.'}
                            </p>
                        </div>
                        <Newsletter dict={dict} variant="full" />
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full -mr-48 -mt-48" />
            </section>

            <Footer locale={locale} dict={dict} />
        </main>
    );
}

function getCategoryLabel(cat: string, locale: string): string {
    const labels: Record<string, Record<string, string>> = {
        STRATEGY: { fr: "Stratégie & Leadership", en: "Strategy & Leadership" },
        strategy: { fr: "Stratégie & Leadership", en: "Strategy & Leadership" },
        IA: { fr: "IA RH & Data", en: "HR AI & Data" },
        ia: { fr: "IA RH & Data", en: "HR AI & Data" },
        DIGITAL: { fr: "Transformation Digitale", en: "Digital Transformation" },
        digital: { fr: "Transformation Digitale", en: "Digital Transformation" },
        HR: { fr: "Ressources Humaines", en: "Human Resources" },
        hr: { fr: "Ressources Humaines", en: "Human Resources" },
    };
    return labels[cat]?.[locale] || cat;
}

function formatDate(dateStr: string | Date, locale: string): string {
    const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
    return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
        day: 'numeric', month: 'short', year: 'numeric'
    }).format(date);
}

function estimateReadTime(content: string): string {
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.max(3, Math.ceil(words / 200));
    return `${minutes} min read`;
}
