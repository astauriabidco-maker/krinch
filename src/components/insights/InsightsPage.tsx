"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InsightsCard from "@/components/insights/InsightsCard";
import Newsletter from "@/components/layout/Newsletter";
import { motion, AnimatePresence } from "framer-motion";

export default function InsightsPage({ dict, locale }: { dict: any; locale: any }) {
    const [filter, setFilter] = useState("all");
    const i = dict; // Our dictionnaire for insights is at the root

    const filteredArticles = filter === "all"
        ? dict.articles
        : dict.articles.filter((a: any) => a.category === filter);

    const filterKeys = ["all", "digital", "ia", "strategy"];

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

            {/* Filters & Grid */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    {/* Filter Bar */}
                    <div className="flex flex-wrap items-center gap-4 mb-16 border-b border-primary/5 pb-8">
                        {filterKeys.map((key) => (
                            <button
                                key={key}
                                onClick={() => setFilter(key)}
                                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${filter === key
                                        ? "bg-secondary text-primary shadow-lg shadow-secondary/20"
                                        : "bg-white border border-gray-100 text-primary/40 hover:border-primary/20"
                                    }`}
                            >
                                {dict.filter[key]}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 min-h-[400px]">
                        <AnimatePresence mode="popLayout">
                            {filteredArticles.map((article: any) => (
                                <InsightsCard key={article.slug} article={article} locale={locale} />
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Newsletter Integration */}
            <section className="py-24 bg-primary text-white overflow-hidden relative">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-serif italic mb-6">
                                Restez à la pointe de <br className="hidden md:block" /> la transformation.
                            </h2>
                            <p className="text-white/60 font-sans leading-relaxed max-w-md">
                                Rejoignez notre cercle de réflexion et recevez chaque mois nos analyses stratégiques directement dans votre boîte mail.
                            </p>
                        </div>
                        <Newsletter dict={dict} variant="full" />
                    </div>
                </div>
                {/* Subtle decorative element */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full -mr-48 -mt-48" />
            </section>

            <Footer locale={locale} dict={dict} />
        </main>
    );
}
