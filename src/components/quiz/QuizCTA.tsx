"use client";

import Link from "next/link";
import { BrainCircuit, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function QuizCTA({ locale, dict }: { locale: string; dict: any }) {
    return (
        <section className="py-24 bg-[#0F2A44] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] -mr-48 -mt-48" />
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="text-left space-y-6 max-w-xl">
                        <div className="flex items-center gap-4 text-secondary">
                            <BrainCircuit className="w-8 h-8" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Outil d'Auto-Diagnostic</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif text-white leading-tight italic">
                            {dict.quiz.title}
                        </h2>
                        <p className="text-white/60 font-sans leading-relaxed">
                            {dict.quiz.subtitle}
                        </p>
                    </div>

                    <button
                        className="group relative inline-flex items-center gap-4 bg-secondary text-primary px-10 py-5 text-xs font-bold uppercase tracking-widest hover:bg-white transition-all overflow-hidden shrink-0"
                        onClick={() => {
                            const quizSection = document.getElementById('ia-ready-quiz');
                            if (quizSection) quizSection.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        {dict.quiz.start}
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}
