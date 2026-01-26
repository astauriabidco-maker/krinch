import Image from "next/image";

interface SectorsHeroProps {
    dict: any;
}

export default function SectorsHero({ dict }: SectorsHeroProps) {
    return (
        <section className="pt-32 pb-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="w-full lg:w-1/2 animate-fade-in-up">
                        <div className="inline-block bg-secondary text-primary px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 rounded-sm shadow-lg">
                            {dict.sectors_page.hero.sme_badge}
                        </div>
                        <h1 className="text-4xl md:text-7xl font-serif text-primary mb-8 leading-tight">
                            {dict.sectors_page.hero.title}
                        </h1>
                        <p className="text-xl text-primary/70 leading-relaxed font-serif italic mb-8">
                            {dict.sectors_page.hero.subtitle}
                        </p>
                        <div className="p-6 border-l-4 border-secondary bg-[#FAFAFA] shadow-sm">
                            <p className="text-sm font-sans leading-relaxed text-primary/80">
                                {dict.sectors_page.hero.intro}
                            </p>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 relative group">
                        <div className="absolute -inset-4 bg-secondary/5 rounded-full blur-3xl group-hover:bg-secondary/10 transition-all duration-700 pointer-events-none" />
                        <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-2xl border border-gray-100">
                            <Image
                                src="/images/sectors_hero.png"
                                alt="Krinch & Partners - SME Coaching in Douala"
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
