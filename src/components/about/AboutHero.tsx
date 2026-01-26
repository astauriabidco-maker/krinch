import Image from "next/image";

interface AboutHeroProps {
    dict: any;
}

export default function AboutHero({ dict }: AboutHeroProps) {
    return (
        <section className="pt-32 pb-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="animate-fade-in-up">
                        <div className="inline-block px-4 py-1.5 bg-secondary/10 mb-6 rounded-sm border border-secondary/20">
                            <span className="text-secondary text-xs font-bold uppercase tracking-[0.2em] leading-none">
                                {dict.nav.about}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif text-primary mb-8 leading-tight">
                            {dict.who_we_are.title}
                        </h1>
                        <p className="text-lg text-primary/70 leading-relaxed max-w-xl">
                            {dict.who_we_are.content}
                        </p>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-secondary/5 -translate-x-6 translate-y-6 -z-10 rounded-2xl" />
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
                            <Image
                                src="/images/about_team.png"
                                alt="Krinch & Partners Team"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
