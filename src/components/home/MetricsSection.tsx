"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface MetricsSectionProps {
    dict: any;
}

function AnimatedCounter({
    target,
    suffix,
    duration = 2000,
    inView,
}: {
    target: number;
    suffix: string;
    duration?: number;
    inView: boolean;
}) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Ease-out cubic for a satisfying deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [inView, target, duration]);

    return (
        <span>
            {count}
            {suffix}
        </span>
    );
}

export default function MetricsSection({ dict }: MetricsSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="relative py-20 bg-primary overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px]" />
                <div className="absolute -top-20 -right-20 text-[20rem] font-serif font-bold text-white/[0.02] select-none leading-none">
                    K&P
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-5 py-1.5 border border-secondary/30 rounded-full text-secondary text-[10px] font-bold uppercase tracking-[0.3em]">
                        {dict.metrics.badge}
                    </span>
                </motion.div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {dict.metrics.items.map((item: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="text-center group"
                        >
                            {/* Value */}
                            <div className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-3 tracking-tight">
                                <AnimatedCounter
                                    target={parseInt(item.value)}
                                    suffix={item.suffix}
                                    inView={isInView}
                                    duration={2000 + index * 300}
                                />
                            </div>

                            {/* Decorative line */}
                            <motion.div
                                initial={{ width: 0 }}
                                animate={isInView ? { width: "3rem" } : { width: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 + index * 0.15 }}
                                className="h-0.5 bg-secondary mx-auto mb-4"
                            />

                            {/* Label */}
                            <h3 className="text-sm md:text-base font-bold uppercase tracking-widest text-white/90 mb-1">
                                {item.label}
                            </h3>

                            {/* Description */}
                            <p className="text-xs md:text-sm text-white/40 font-sans">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
