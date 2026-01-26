"use client";

import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PartnerLogos from "@/components/home/PartnerLogos";
import PromiseSection from "@/components/home/PromiseSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import Testimonials from "@/components/home/Testimonials";
import SectorsPreview from "@/components/home/SectorsPreview";
import InsightsPreview from "@/components/home/InsightsPreview";
import FinalCTA from "@/components/home/FinalCTA";
import QuizCTA from "@/components/quiz/QuizCTA";
import IAReadyQuiz from "@/components/quiz/IAReadyQuiz";
import { Briefcase, Database, Cpu, RefreshCw, GraduationCap, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Locale } from "@/lib/i18n/get-dictionary";

export default function HomePage({ dict, locale }: { dict: any; locale: Locale }) {
    return (
        <main className="min-h-screen">
            <Header locale={locale} dict={dict} />

            {/* 1. SECTION HERO */}
            <section className="relative h-[90vh] md:h-screen flex items-center overflow-hidden bg-primary">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <motion.div
                        animate={{ scale: [1, 1.1] }}
                        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                        className="w-full h-full"
                    >
                        <Image
                            src="/images/hero_premium.png"
                            alt="Cabinet de conseil RH Cameroun - Expertise en transformation digitale et leadership à Douala"
                            fill
                            className="object-cover brightness-50"
                            priority
                        />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl text-left animate-fade-in-up">
                        <div className="inline-block px-4 py-1 mb-8 border border-secondary/30 rounded-full bg-secondary/5 backdrop-blur-sm">
                            <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">{dict.hero.promise}</span>
                        </div>

                        <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif text-white mb-8 tracking-tight leading-[1.1]">
                            {dict.hero.title.split(' ').slice(0, -2).join(' ')} <br className="hidden md:block" />
                            <span className="text-secondary italic">{dict.hero.title.split(' ').slice(-2).join(' ')}</span>
                        </h1>

                        <p className="max-w-2xl text-lg md:text-xl text-white/70 mb-12 font-sans leading-relaxed">
                            {dict.hero.subtitle}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <button className="w-full sm:w-auto bg-secondary text-primary px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-white transition-all shadow-2xl hover:-translate-y-1">
                                {dict.hero.cta}
                            </button>
                            <button className="w-full sm:w-auto border border-white/30 text-white px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all">
                                {dict.hero.secondary_cta}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Floating Expertise Tags */}
                <div className="absolute bottom-12 right-6 hidden lg:flex flex-col items-end space-y-4">
                    <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-md border border-white/10 px-5 py-3 rounded-sm">
                        <Briefcase className="text-secondary w-4 h-4" />
                        <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Conseil Stratégique RH</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-md border border-white/10 px-5 py-3 rounded-sm">
                        <Database className="text-secondary w-4 h-4" />
                        <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Master Data Management</span>
                    </div>
                </div>
            </section>

            {/* 1b. PARTNER LOGOS */}
            <PartnerLogos dict={dict} />

            {/* 2. SECTION NOTRE PROMESSE */}
            <PromiseSection dict={dict} />

            {/* 3. SECTION SERVICES (GRID) */}
            <section className="py-24 bg-[#F5F7FA]">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
                        <div className="max-w-2xl text-left">
                            <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                                Nos Expertises
                            </span>
                            <h2 className="text-3xl md:text-5xl font-serif text-primary leading-tight italic">
                                Des solutions agiles pour des <br className="hidden md:block" /> organisations d'exception
                            </h2>
                        </div>
                        <p className="text-primary/60 max-w-sm mb-2">
                            Nous combinons profondeur analytique et pragmatisme opérationnel pour transformer vos défis en leviers de croissance.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Logic for services icons */}
                        {[
                            { icon: Briefcase, key: 'rh' },
                            { icon: Cpu, key: 'digital' },
                            { icon: Database, key: 'ia' },
                            { icon: RefreshCw, key: 'transformation' },
                            { icon: GraduationCap, key: 'formation' },
                            { icon: Search, key: 'recrutement' }
                        ].map((service, idx) => (
                            <div key={idx} className="bg-white p-10 border border-gray-100 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                                <div className="relative z-10">
                                    <service.icon className="text-secondary w-10 h-10 mb-8 stroke-[1.5]" />
                                    <h3 className="text-xl font-serif font-bold text-primary mb-4 group-hover:text-secondary transition-colors">
                                        {dict.services[service.key].title}
                                    </h3>
                                    <p className="text-primary/60 text-sm leading-relaxed mb-8">
                                        {dict.services[service.key].desc}
                                    </p>
                                </div>
                                {/* Subtle hover background accent */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 -mr-12 -mt-12 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. SECTION TESTIMONIALS */}
            <Testimonials dict={dict} />

            {/* 4b. WHY US */}
            <WhyUsSection dict={dict} />

            {/* 5. SECTION SECTEURS (PREVIEW) */}
            <SectorsPreview dict={dict} />

            {/* 5b. INSIGHTS PREVIEW */}
            <InsightsPreview dict={dict} locale={locale} />

            {/* IA Ready Diagnostic CTA */}
            <QuizCTA locale={locale} dict={dict} />

            <section id="ia-ready-quiz" className="scroll-mt-20">
                <IAReadyQuiz dict={dict} locale={locale} />
            </section>

            {/* 6. CTA FINAL */}
            <FinalCTA dict={dict} />

            <Footer locale={locale} dict={dict} />
        </main>
    );
}
