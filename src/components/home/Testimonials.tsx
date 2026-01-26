"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface TestimonialsProps {
    dict: any;
}

export default function Testimonials({ dict }: TestimonialsProps) {
    const t = dict.testimonials;

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                        {t.badge}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif text-primary">
                        {t.title}
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {t.items.map((item: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative p-10 bg-gray-50 border border-gray-100 rounded-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
                        >
                            <Quote className="absolute top-6 left-6 text-secondary/20 w-12 h-12" />
                            <div className="relative z-10">
                                <p className="text-lg font-serif italic text-primary/80 mb-8 leading-relaxed">
                                    "{item.quote}"
                                </p>
                                <div>
                                    <h4 className="font-sans font-bold text-primary text-sm uppercase tracking-wider">
                                        {item.author}
                                    </h4>
                                    <p className="text-secondary text-xs mt-1 font-medium">
                                        {item.company}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
