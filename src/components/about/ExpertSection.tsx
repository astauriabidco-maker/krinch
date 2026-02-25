"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

interface ExpertSectionProps {
    dict: any;
}

export default function ExpertSection({ dict }: ExpertSectionProps) {
    const e = dict.experts;

    const portraits = [
        "/images/experts/jp-ewane.png",
        "/images/experts/mt-ndongo.png",
        "/images/experts/ma-kamga.png"
    ];

    return (
        <section className="py-24 bg-primary text-white overflow-hidden">
            <div className="container mx-auto px-6">
                <Reveal width="100%">
                    <div className="text-center mb-20">
                        <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                            L'Équipe
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif mb-6 italic">
                            {e.title}
                        </h2>
                        <p className="text-white/60 max-w-2xl mx-auto font-sans leading-relaxed">
                            {e.subtitle}
                        </p>
                    </div>
                </Reveal>

                <div className="grid md:grid-cols-3 gap-12">
                    {e.items.map((expert: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group"
                        >
                            <div className="relative aspect-[4/5] mb-8 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 bg-black/20">
                                {portraits[index] ? (
                                    <Image
                                        src={portraits[index]}
                                        alt={`Portrait de ${expert.name}, Consultant RH Senior chez Krinch & Partners - Expert en ${expert.role} à Douala`}
                                        fill
                                        className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-4xl font-serif text-secondary/30 font-bold">
                                            {expert.name?.split(' ').map((n: string) => n[0]).join('')}
                                        </span>
                                    </div>
                                )}
                                <div className="absolute inset-0 border border-white/10 group-hover:border-secondary/40 transition-colors pointer-events-none" />
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xl font-serif italic text-white group-hover:text-secondary transition-colors">
                                    {expert.name}
                                </h3>
                                <p className="text-secondary text-xs font-bold uppercase tracking-widest">
                                    {expert.role}
                                </p>
                                <p className="text-white/40 text-sm font-sans leading-relaxed pt-2">
                                    {expert.bio}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
