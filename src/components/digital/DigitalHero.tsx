import Image from "next/image";

interface DigitalHeroProps {
    dict: any;
}

export default function DigitalHero({ dict }: DigitalHeroProps) {
    return (
        <section className="pt-32 pb-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="animate-fade-in-up">
                        <h1 className="text-4xl md:text-7xl font-serif mb-8 leading-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0F2A44] to-[#1E4D7B]">
                                {dict.digital_hero.title}
                            </span>
                        </h1>
                        <div className="w-20 h-1 bg-secondary mb-12" />
                        <p className="text-xl text-primary/70 leading-relaxed max-w-xl font-serif italic">
                            {dict.digital_hero.subtitle}
                        </p>
                    </div>

                    <div className="relative group">
                        {/* Ambient glow effect */}
                        <div className="absolute -inset-4 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all duration-700" />
                        <div className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl border border-gray-100">
                            <Image
                                src="/images/digital_hero.png"
                                alt="Digital & IA HR Innovation"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
