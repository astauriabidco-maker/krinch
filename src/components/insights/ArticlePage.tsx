"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Newsletter from "@/components/layout/Newsletter";
import { Clock, Calendar, ChevronLeft, ArrowRight, User, Share2 } from "lucide-react";

const FALLBACK_IMAGES: Record<string, string> = {
    ia: "/images/insights/ia-rh.png",
    digital: "/images/insights/digital.png",
    strategy: "/images/insights/leadership.png",
    hr: "/images/insights/digital.png",
};

export default function ArticlePage({ article, dict, locale }: { article: any; dict: any; locale: any }) {
    const imageUrl = article.image || FALLBACK_IMAGES[article.category] || "/images/insights/digital.png";

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: article.title,
                text: article.excerpt,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
        }
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
                        {locale === 'fr' ? 'Retour aux insights' : 'Back to insights'}
                    </Link>

                    <header className="mb-16">
                        <div className="flex flex-wrap items-center gap-6 mb-8">
                            <span className="text-secondary text-xs font-bold uppercase tracking-[0.2em] bg-secondary/5 px-4 py-1.5 rounded-full">
                                {article.categoryLabel}
                            </span>
                            {article.date && (
                                <div className="flex items-center gap-2 text-primary/40 text-[11px] font-bold uppercase tracking-tighter">
                                    <Calendar size={14} />
                                    {article.date}
                                </div>
                            )}
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

                        {/* Author & Share */}
                        <div className="flex items-center justify-between mt-10 pt-8 border-t border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center">
                                    <User size={16} className="text-primary/40" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-primary">{article.author || 'Krinch & Partners'}</p>
                                    <p className="text-xs text-primary/40">{locale === 'fr' ? 'Équipe éditoriale' : 'Editorial team'}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary/40 hover:text-secondary border border-gray-200 hover:border-secondary/30 rounded-full transition-all"
                            >
                                <Share2 size={14} />
                                {locale === 'fr' ? 'Partager' : 'Share'}
                            </button>
                        </div>
                    </header>
                </div>

                {/* Featured Image */}
                <div className="relative w-full aspect-[21/9] mb-20 bg-primary/5">
                    <Image
                        src={imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="container mx-auto px-6 max-w-3xl mb-24">
                    <div
                        className="prose prose-lg prose-primary max-w-none font-sans text-primary/80 leading-loose
                            prose-headings:font-serif prose-headings:text-primary prose-headings:italic prose-headings:leading-tight
                            prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-secondary prose-h2:pl-6
                            prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
                            prose-p:mb-6
                            prose-ul:my-6 prose-li:text-primary/70
                            prose-blockquote:border-l-4 prose-blockquote:border-secondary prose-blockquote:bg-secondary/5 prose-blockquote:px-8 prose-blockquote:py-6 prose-blockquote:italic prose-blockquote:font-serif prose-blockquote:text-primary prose-blockquote:not-italic prose-blockquote:rounded-r-sm
                            prose-strong:text-primary prose-strong:font-bold
                            prose-a:text-secondary prose-a:underline prose-a:decoration-secondary/30 hover:prose-a:decoration-secondary
                        "
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    {/* Dynamic Conversion CTA */}
                    <div className="mt-20 p-12 bg-primary text-white rounded-sm relative overflow-hidden group shadow-2xl">
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="max-w-md">
                                <h3 className="text-2xl font-serif mb-4 italic">{dict.cta_article}</h3>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    {locale === 'fr'
                                        ? 'Nos experts vous accompagnent dans la mise en œuvre de solutions concrètes pour votre organisation.'
                                        : 'Our experts help you implement concrete solutions for your organization.'}
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
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -mr-32 -mt-32" />
                    </div>
                </div>
            </article>

            {/* Newsletter Section */}
            <section className="py-24 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-6 max-w-3xl text-center">
                    <h2 className="text-3xl font-serif italic mb-4">
                        {locale === 'fr' ? 'Rejoindre le cercle de réflexion' : 'Join our think tank'}
                    </h2>
                    <p className="text-primary/60 mb-12 max-w-md mx-auto font-sans leading-relaxed">
                        {locale === 'fr'
                            ? 'Recevez nos analyses et réflexions stratégiques directement dans votre boîte mail.'
                            : 'Receive our strategic insights directly in your inbox.'}
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
