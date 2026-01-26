import { LucideIcon } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

interface PromiseSectionProps {
    dict: any;
}

export default function PromiseSection({ dict }: PromiseSectionProps) {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <Reveal width="100%">
                        <div className="inline-block px-4 py-1.5 bg-secondary/10 mb-6 rounded-sm border border-secondary/20">
                            <span className="text-secondary text-xs font-bold uppercase tracking-[0.2em] leading-none">
                                Notre Engagement
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif text-primary mb-8 leading-tight">
                            {dict.promise.title}
                        </h2>
                        <p className="text-lg text-primary/70 mb-10 leading-relaxed max-w-xl">
                            {dict.promise.subtitle}
                        </p>

                        <div className="space-y-6">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">
                                {dict.promise.combination_title}
                            </h3>
                            <ul className="space-y-4">
                                {dict.promise.items.map((item: string, index: number) => (
                                    <li key={index} className="flex items-start gap-4 group">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary group-hover:scale-125 transition-transform" />
                                        <span className="text-primary/80 font-sans tracking-tight">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>

                    <div className="relative">
                        <div className="absolute inset-0 bg-secondary/5 -skew-x-12 translate-x-12 translate-y-12 -z-10" />
                        <div className="aspect-[4/3] bg-primary relative overflow-hidden shadow-2xl">
                            {/* Decorative element instead of a second large image */}
                            <div className="absolute inset-0 flex items-center justify-center p-12">
                                <div className="text-center">
                                    <div className="text-6xl font-serif text-secondary/30 mb-4 font-bold">K&P</div>
                                    <div className="w-12 h-px bg-secondary mx-auto mb-4" />
                                    <div className="text-white/40 text-xs font-bold uppercase tracking-[0.4em]">Excellence • Sobriété</div>
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0 p-8">
                                <div className="text-secondary text-8xl font-serif opacity-10">“</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
