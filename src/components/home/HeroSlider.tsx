"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Database, ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSliderProps {
    dict: any;
    locale: string;
}

const SLIDE_DURATION = 7000; // 7 seconds per slide

// Map slide index to CTA destinations
const SLIDE_LINKS = [
    { primary: "/contact", secondary: "/contact" },
    { primary: "/about", secondary: "/contact" },
    { primary: "/about", secondary: "/about" },
    { primary: "/about", secondary: "/contact" },
];

export default function HeroSlider({ dict, locale }: HeroSliderProps) {
    const slides = dict.hero.slides;
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(0);

    const goToSlide = useCallback((index: number) => {
        setCurrent(index);
        setProgress(0);
    }, []);

    const nextSlide = useCallback(() => {
        goToSlide((current + 1) % slides.length);
    }, [current, slides.length, goToSlide]);

    const prevSlide = useCallback(() => {
        goToSlide((current - 1 + slides.length) % slides.length);
    }, [current, slides.length, goToSlide]);

    // Auto-advance
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    nextSlide();
                    return 0;
                }
                return prev + (100 / (SLIDE_DURATION / 50));
            });
        }, 50);

        return () => clearInterval(interval);
    }, [isPaused, nextSlide]);

    const slide = slides[current];
    const links = SLIDE_LINKS[current] || SLIDE_LINKS[0];

    return (
        <section
            className="relative h-[90vh] md:h-screen overflow-hidden bg-primary"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background Images with crossfade */}
            <AnimatePresence mode="sync">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={slide.image}
                        alt=""
                        fill
                        className="object-cover"
                        priority={current === 0}
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-primary/30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="container mx-auto px-6 relative z-10 h-full flex items-center">
                <div className="max-w-4xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            {/* Badge */}
                            <div className="inline-block px-4 py-1.5 mb-8 border border-secondary/30 rounded-full bg-secondary/5 backdrop-blur-sm">
                                <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.2em]">
                                    {slide.badge}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif text-white mb-8 tracking-tight leading-[1.05]">
                                {slide.title.split(' ').length > 3 ? (
                                    <>
                                        {slide.title.split(' ').slice(0, Math.ceil(slide.title.split(' ').length / 2)).join(' ')}
                                        <br className="hidden md:block" />
                                        <span className="text-secondary italic">
                                            {slide.title.split(' ').slice(Math.ceil(slide.title.split(' ').length / 2)).join(' ')}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        {slide.title.split(' ').slice(0, -1).join(' ')}{' '}
                                        <span className="text-secondary italic">
                                            {slide.title.split(' ').slice(-1).join(' ')}
                                        </span>
                                    </>
                                )}
                            </h1>

                            {/* Subtitle */}
                            <p className="max-w-2xl text-lg md:text-xl text-white/70 mb-12 font-sans leading-relaxed">
                                {slide.subtitle}
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <Link
                                    href={`/${locale}${links.primary}`}
                                    className="w-full sm:w-auto bg-secondary text-primary px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-white transition-all shadow-2xl hover:-translate-y-1 min-w-[200px] text-center"
                                >
                                    {slide.cta}
                                </Link>
                                <Link
                                    href={`/${locale}${links.secondary}`}
                                    className="w-full sm:w-auto border-2 border-white/50 text-white px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all min-w-[200px] text-center"
                                >
                                    {slide.secondary_cta}
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Floating Tags (only on first slide) */}
            {current === 0 && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-24 right-6 hidden lg:flex flex-col items-end space-y-4 z-10"
                >
                    <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-md border border-white/10 px-5 py-3 rounded-sm">
                        <Briefcase className="text-secondary w-4 h-4" />
                        <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">
                            {dict.hero.tag_consulting}
                        </span>
                    </div>
                    <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-md border border-white/10 px-5 py-3 rounded-sm">
                        <Database className="text-secondary w-4 h-4" />
                        <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">
                            {dict.hero.tag_data}
                        </span>
                    </div>
                </motion.div>
            )}

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 z-20">
                <button
                    onClick={prevSlide}
                    className="p-3 bg-white/5 backdrop-blur-md border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all rounded-sm"
                    aria-label="Slide précédente"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 z-20">
                <button
                    onClick={nextSlide}
                    className="p-3 bg-white/5 backdrop-blur-md border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all rounded-sm"
                    aria-label="Slide suivante"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Bottom: Progress dots + progress bar */}
            <div className="absolute bottom-8 left-0 right-0 z-20">
                <div className="container mx-auto px-6">
                    <div className="flex items-center gap-6">
                        {/* Slide indicators */}
                        <div className="flex items-center gap-3">
                            {slides.map((_: any, idx: number) => (
                                <button
                                    key={idx}
                                    onClick={() => goToSlide(idx)}
                                    className="group relative"
                                    aria-label={`Slide ${idx + 1}`}
                                >
                                    <div className={`h-1 rounded-full transition-all duration-500 overflow-hidden ${idx === current ? "w-16 bg-white/20" : "w-8 bg-white/10 hover:bg-white/20"
                                        }`}>
                                        {idx === current && (
                                            <motion.div
                                                className="h-full bg-secondary rounded-full"
                                                style={{ width: `${progress}%` }}
                                            />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Slide counter */}
                        <div className="text-white/30 text-xs font-bold tracking-widest">
                            <span className="text-secondary">{String(current + 1).padStart(2, '0')}</span>
                            <span className="mx-1">/</span>
                            <span>{String(slides.length).padStart(2, '0')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
