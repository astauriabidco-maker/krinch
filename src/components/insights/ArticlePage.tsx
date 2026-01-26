"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Newsletter from "@/components/layout/Newsletter";
import { Clock, Calendar, ChevronLeft, ArrowRight } from "lucide-react";

export default function ArticlePage({ article, dict, locale }: { article: any; dict: any; locale: any }) {
    const images: Record<string, string> = {
        "ia": "/images/insights/ia-rh.png",
        "digital": "/images/insights/digital.png",
        "strategy": "/images/insights/leadership.png"
    };

    return (
        <main className="min-h-screen bg-white">
            <Header locale={locale} dict={dict} />

            {/* Article Header */}
            <article className="pt-40">
                <div className="container mx-auto px-6 max-w-4xl">
                    <Link
                        href={`/${locale}/insights`}
                        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary/40 hover:text-secondary mb-12 transition-colors group"
                    >
                        <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Retour aux insights
                    </Link>

                    <header className="mb-16">
                        <div className="flex flex-wrap items-center gap-6 mb-8">
                            <span className="text-secondary text-xs font-bold uppercase tracking-[0.2em] bg-secondary/5 px-4 py-1.5 rounded-full">
                                {article.categoryLabel}
                            </span>
                            <div className="flex items-center gap-2 text-primary/40 text-[11px] font-bold uppercase tracking-tighter">
                                <Calendar size={14} />
                                {article.date}
                            </div>
                            <div className="flex items-center gap-2 text-primary/40 text-[11px] font-bold uppercase tracking-tighter">
                                <Clock size={14} />
                                {article.readTime}
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-serif text-primary leading-tight italic mb-8">
                            {article.title}
                        </h1>

                        <p className="text-xl text-primary/60 font-serif leading-relaxed italic border-l-4 border-secondary pl-8 py-2">
                            {article.excerpt}
                        </p>
                    </header>
                </div>

                {/* Featured Image */}
                <div className="relative w-full aspect-[21/9] mb-20 bg-primary/5">
                    <Image
                        src={images[article.category] || "/images/insights/digital.png"}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content */}
                <div className="container mx-auto px-6 max-w-3xl mb-24">
                    <div className="prose prose-lg prose-primary max-w-none font-sans text-primary/80 leading-loose">
                        <p>{article.content}</p>
                        {/* Simulation of long content */}
                        <p className="mt-8">
                            Dans le contexte actuel de transformation accélérée, Krinch & Partners observe que les entreprises les plus résilientes sont celles qui placent l'humain au cœur de leur stratégie technologique. L'intelligence artificielle n'est pas une fin en soi, mais un levier de croissance au service des talents.
                        </p>
                        <p className="mt-8">
                            Notre expertise locale, combinée à une veille constante sur les innovations globales, nous permet d'accompagner nos partenaires vers une excellence durable.
                        </p>
                    </div>

                    {/* Dynamic Conversion CTA */}
                    <div className="mt-20 p-12 bg-primary text-white rounded-sm relative overflow-hidden group shadow-2xl">
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="max-w-md">
                                <h3 className="text-2xl font-serif mb-4 italic">{dict.cta_article}</h3>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    Nos experts vous accompagnent dans la mise en œuvre de solutions concrètes pour votre organisation.
                                </p>
                            </div>
                            <Link
                                href={`/${locale}/contact`}
                                className="w-full md:w-auto px-8 py-5 bg-secondary text-primary text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl flex items-center justify-center gap-3"
                            >
                                {dict.cta_button}
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                        {/* Background pattern */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -mr-32 -mt-32" />
                    </div>
                </div>
            </article>

            {/* Newsletter Section */}
            <section className="py-24 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-6 max-w-3xl text-center">
                    <h2 className="text-3xl font-serif italic mb-4">Rejoindre le cercle de réflexion</h2>
                    <p className="text-primary/60 mb-12 max-w-md mx-auto font-sans leading-relaxed">
                        {dict.newsletter.description}
                    </p>
                    <div className="max-w-md mx-auto">
                        <Newsletter dict={dict} variant="minimal" />
                    </div>
                </div>
            </section>

            <Footer locale={locale} dict={dict} />
        </main>
    );
}
