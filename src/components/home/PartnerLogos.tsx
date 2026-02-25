"use client";

import { motion } from "framer-motion";
import { Dictionary } from "@/lib/types";

interface PartnerLogosProps {
    dict: Dictionary;
}

export default function PartnerLogos({ dict }: PartnerLogosProps) {
    const partners = dict.partners as string[];
    return (
        <section className="py-12 bg-gray-50 border-y border-gray-100 overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-700"
                >
                    {partners.map((partner: string) => (
                        <div key={partner} className="flex flex-col items-center">
                            <div className="w-24 md:w-32 h-12 border-2 border-primary/10 rounded-sm flex items-center justify-center text-[10px] tracking-[0.2em] font-bold text-primary/40">
                                [ {partner} ]
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
