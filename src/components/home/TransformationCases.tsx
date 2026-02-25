"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, TrendingUp, AlertTriangle, Wrench, Truck, Landmark, Factory } from "lucide-react";

interface TransformationCasesProps {
    dict: any;
}

const SECTOR_ICONS = [Truck, Landmark, Factory];
const SECTOR_COLORS = [
    { accent: "from-amber-500 to-orange-600", bg: "bg-amber-500", light: "bg-amber-50", text: "text-amber-600" },
    { accent: "from-blue-500 to-indigo-600", bg: "bg-blue-500", light: "bg-blue-50", text: "text-blue-600" },
    { accent: "from-emerald-500 to-teal-600", bg: "bg-emerald-500", light: "bg-emerald-50", text: "text-emerald-600" },
];

export default function TransformationCases({ dict }: TransformationCasesProps) {
    const t = dict.transformations;
    const [activeCase, setActiveCase] = useState(0);
    const currentCase = t.cases[activeCase];
    const color = SECTOR_COLORS[activeCase];
    const SectorIcon = SECTOR_ICONS[activeCase];

    const nextCase = () => setActiveCase((prev) => (prev + 1) % t.cases.length);
    const prevCase = () => setActiveCase((prev) => (prev - 1 + t.cases.length) % t.cases.length);

    return (
        <section className="relative py-28 bg-primary overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/[0.03] rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[80px]" />
                {/* Large number watermark */}
                <div className="absolute top-12 right-12 text-[14rem] font-serif font-bold text-white/[0.02] select-none leading-none hidden lg:block">
                    0{activeCase + 1}
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <span className="inline-block px-5 py-1.5 border border-secondary/30 rounded-full text-secondary text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
                        {t.badge}
                    </span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white leading-tight italic mb-6">
                        {t.title}
                    </h2>
                    <p className="text-white/40 max-w-2xl mx-auto font-sans leading-relaxed">
                        {t.subtitle}
                    </p>
                </div>

                {/* Case Selector - Pill style with icons */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {t.cases.map((c: any, index: number) => {
                        const Icon = SECTOR_ICONS[index];
                        return (
                            <button
                                key={index}
                                onClick={() => setActiveCase(index)}
                                className={`flex items-center gap-3 px-7 py-4 text-xs font-bold uppercase tracking-widest border transition-all duration-500 rounded-sm ${activeCase === index
                                        ? "bg-secondary text-primary border-secondary shadow-lg shadow-secondary/20"
                                        : "bg-white/5 text-white/50 border-white/10 hover:border-white/30 hover:text-white/80"
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {c.sector}
                            </button>
                        );
                    })}
                </div>

                {/* Active Case Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCase}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Hero Results - Full width impact strip */}
                        <div className="mb-10">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-sm overflow-hidden">
                                {currentCase.results.map((result: any, idx: number) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.12, duration: 0.5 }}
                                        className={`relative p-10 md:p-12 text-center border-b md:border-b-0 md:border-r last:border-r-0 border-white/5 ${idx === 0 ? "bg-white" : "bg-white/[0.97]"
                                            }`}
                                    >
                                        {/* Metric number — huge */}
                                        <div className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-primary mb-3 tracking-tight leading-none">
                                            {result.metric}
                                        </div>
                                        {/* Gold separator */}
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "3rem" }}
                                            transition={{ delay: 0.4 + idx * 0.12, duration: 0.6 }}
                                            className="h-0.5 bg-secondary mx-auto mb-3"
                                        />
                                        {/* Label */}
                                        <div className="text-primary/50 text-xs font-bold uppercase tracking-widest">
                                            {result.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Challenge → Solution → Quote */}
                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Challenge card */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="relative p-8 bg-white/[0.05] border border-white/10 backdrop-blur-sm rounded-sm group hover:border-red-400/30 transition-colors duration-500"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2.5 bg-red-500/10 rounded-sm border border-red-500/20">
                                        <AlertTriangle className="w-4 h-4 text-red-400" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">
                                        {t.challenge_label}
                                    </span>
                                </div>
                                <p className="text-white/70 font-sans leading-relaxed text-sm">
                                    {currentCase.challenge}
                                </p>
                                {/* Connector arrow (desktop) */}
                                <div className="hidden lg:block absolute top-1/2 -right-3 z-20">
                                    <div className="w-6 h-6 bg-primary border border-white/10 rotate-45 flex items-center justify-center">
                                    </div>
                                </div>
                            </motion.div>

                            {/* Solution card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35, duration: 0.5 }}
                                className="relative p-8 bg-white/[0.05] border border-white/10 backdrop-blur-sm rounded-sm group hover:border-emerald-400/30 transition-colors duration-500"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2.5 bg-emerald-500/10 rounded-sm border border-emerald-500/20">
                                        <Wrench className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                                        {t.solution_label}
                                    </span>
                                </div>
                                <p className="text-white/70 font-sans leading-relaxed text-sm">
                                    {currentCase.solution}
                                </p>
                                {/* Connector arrow (desktop) */}
                                <div className="hidden lg:block absolute top-1/2 -right-3 z-20">
                                    <div className="w-6 h-6 bg-primary border border-white/10 rotate-45"></div>
                                </div>
                            </motion.div>

                            {/* Quote card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="relative p-8 bg-secondary/10 border border-secondary/20 backdrop-blur-sm rounded-sm"
                            >
                                <Quote className="w-8 h-8 text-secondary/30 mb-4" />
                                <p className="text-white/80 font-serif italic text-base leading-relaxed mb-6">
                                    &ldquo;{currentCase.quote}&rdquo;
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-px bg-secondary" />
                                    <span className="text-secondary/70 text-[10px] font-bold uppercase tracking-[0.2em]">
                                        {currentCase.author}
                                    </span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center justify-between mt-12">
                            <button
                                onClick={prevCase}
                                className="flex items-center gap-3 text-white/40 hover:text-secondary transition-colors group"
                            >
                                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">
                                    {t.cases[(activeCase - 1 + t.cases.length) % t.cases.length].sector}
                                </span>
                            </button>

                            {/* Dots */}
                            <div className="flex gap-2">
                                {t.cases.map((_: any, idx: number) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveCase(idx)}
                                        className={`transition-all duration-300 rounded-full ${idx === activeCase
                                                ? "w-8 h-2 bg-secondary"
                                                : "w-2 h-2 bg-white/20 hover:bg-white/40"
                                            }`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={nextCase}
                                className="flex items-center gap-3 text-white/40 hover:text-secondary transition-colors group"
                            >
                                <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">
                                    {t.cases[(activeCase + 1) % t.cases.length].sector}
                                </span>
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
