import Image from "next/image";

interface CareersHeroProps {
    dict: any;
}

export default function CareersHero({ dict }: CareersHeroProps) {
    return (
        <section className="pt-32 pb-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="animate-fade-in-up">
                        <h1 className="text-4xl md:text-7xl font-serif text-primary mb-8 leading-tight">
                            {dict.careers_page.hero.title}
                        </h1>
                        <div className="w-20 h-1 bg-secondary mb-12" />
                        <p className="text-xl text-primary/70 leading-relaxed max-w-xl font-serif italic">
                            {dict.careers_page.hero.subtitle}
                        </p>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-4 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="relative aspect-square overflow-hidden rounded-sm shadow-2xl border border-gray-100">
                            <Image
                                src="/images/careers_hero.png"
                                alt="Krinch & Partners Team"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
