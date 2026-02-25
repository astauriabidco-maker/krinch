"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSlider from "@/components/home/HeroSlider";
import PartnerLogos from "@/components/home/PartnerLogos";
import MetricsSection from "@/components/home/MetricsSection";
import PromiseSection from "@/components/home/PromiseSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import Testimonials from "@/components/home/Testimonials";
import SectorsPreview from "@/components/home/SectorsPreview";
import InsightsPreview from "@/components/home/InsightsPreview";
import FinalCTA from "@/components/home/FinalCTA";
import QuizCTA from "@/components/quiz/QuizCTA";
import IAReadyQuiz from "@/components/quiz/IAReadyQuiz";
import { Briefcase, Database, Cpu, RefreshCw, GraduationCap, Search } from "lucide-react";
import { Locale } from "@/lib/i18n/get-dictionary";

export default function HomePage({ dict, locale, articles }: { dict: any; locale: Locale; articles?: any[] }) {
    return (
        <main className="min-h-screen">
            <Header locale={locale} dict={dict} />

            {/* 1. HERO SLIDER */}
            <HeroSlider dict={dict} locale={locale} />

            {/* 1b. PARTNER LOGOS */}
            <PartnerLogos dict={dict} />

            {/* 1c. KEY METRICS */}
            <MetricsSection dict={dict} />

            {/* 2. SECTION NOTRE PROMESSE */}
            <PromiseSection dict={dict} />

            {/* 3. SECTION SERVICES (GRID) */}
            <section className="py-24 bg-[#F5F7FA]">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
                        <div className="max-w-2xl text-left">
                            <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                                {dict.services.badge}
                            </span>
                            <h2 className="text-3xl md:text-5xl font-serif text-primary leading-tight italic">
                                {dict.services.title}
                            </h2>
                        </div>
                        <p className="text-primary/60 max-w-sm mb-2">
                            {dict.services.subtitle}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <InsightsPreview dict={dict} locale={locale} articles={articles} />

            {/* IA Ready Diagnostic CTA */}
            <QuizCTA locale={locale} dict={dict} />

            <section id="ia-ready-quiz" className="scroll-mt-20">
                <IAReadyQuiz dict={dict} locale={locale} />
            </section>

            {/* 6. CTA FINAL */}
            <FinalCTA dict={dict} locale={locale} />

            <Footer locale={locale} dict={dict} />
        </main>
    );
}
