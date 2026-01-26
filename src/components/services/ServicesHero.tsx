import Image from "next/image";

interface ServicesHeroProps {
    dict: any;
}

export default function ServicesHero({ dict }: ServicesHeroProps) {
    return (
        <section className="pt-32 pb-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in-up">
                    <h1 className="text-4xl md:text-6xl font-serif text-primary mb-8 leading-tight">
                        {dict.services_page.hero.title}
                    </h1>
                    <p className="text-xl text-primary/70 leading-relaxed italic font-serif">
                        {dict.services_page.hero.intro}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-sm shadow-2xl border border-gray-100">
                        <Image
                            src="/images/services_hero.png"
                            alt="Krinch & Partners Service Excellence"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="space-y-12">
                        <h2 className="text-2xl font-serif text-primary border-l-4 border-secondary pl-6">
                            {dict.services_page.value_cycle.title}
                        </h2>
                        <div className="relative">
                            <Image
                                src="/images/hr_value_cycle.png"
                                alt="HR Value Cycle"
                                width={600}
                                height={400}
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
