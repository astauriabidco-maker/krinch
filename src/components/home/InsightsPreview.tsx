"use client";

import { motion } from "framer-motion";
import InsightsCard from "@/components/insights/InsightsCard";
import Link from "next/link";

interface InsightsPreviewProps {
    dict: any;
    locale: string;
}

export default function InsightsPreview({ dict, locale }: InsightsPreviewProps) {
    const articles = dict.articles.slice(0, 3);

    return (
        <section className="py-24 bg-white border-t border-gray-100">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl text-left">
                        <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                            Leadership d'Opinion
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif text-primary leading-tight italic">
                            Nos dernières analyses & <br className="hidden md:block" /> réflexions stratégiques
                        </h2>
                    </div>
                    <Link
                        href={`/${locale}/insights`}
                        className="shrink-0 text-xs font-bold uppercase tracking-widest border-b border-primary/20 hover:border-secondary transition-all pb-1"
                    >
                        Voir tous les insights
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {articles.map((article: any) => (
                        <InsightsCard key={article.slug} article={article} locale={locale} />
                    ))}
                </div>
            </div>
        </section>
    );
}
