import Image from "next/image";
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
                                {dict.promise.badge}
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
                        <div className="aspect-[4/3] relative overflow-hidden shadow-2xl group">
                            <Image
                                src="/images/promise_team.png"
                                alt="Équipe de consultants Krinch & Partners en réunion stratégique"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />

                            {/* Motto overlay at bottom */}
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-px bg-secondary" />
                                    <span className="text-white/70 text-xs font-bold uppercase tracking-[0.4em]">
                                        {dict.promise.motto}
                                    </span>
                                </div>
                            </div>

                            {/* Decorative quote */}
                            <div className="absolute top-6 right-6">
                                <div className="text-secondary text-6xl font-serif opacity-20 leading-none">"</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
