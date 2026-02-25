import { Lightbulb, Settings, BarChart3 } from "lucide-react";

interface TrainingHeroProps {
    dict: any;
}

const philosophyIcons = [Lightbulb, Settings, BarChart3];

export default function TrainingHero({ dict }: TrainingHeroProps) {
    return (
        <section className="pt-32 pb-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-24 animate-fade-in-up">
                    <h1 className="text-4xl md:text-7xl font-serif text-primary mb-8 leading-tight">
                        {dict.training_hero.title}
                    </h1>
                    <div className="w-24 h-1 bg-secondary mx-auto mb-12" />
                    <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-primary/40 mb-16">
                        {dict.training_hero.philosophy_title}
                    </h2>

                    <div className="grid md:grid-cols-3 gap-12">
                        {dict.training_hero.pillars.map((pillar: any, index: number) => {
                            const Icon = philosophyIcons[index];
                            return (
                                <div key={index} className="group">
                                    <div className="mb-6 p-4 inline-block bg-secondary/10 text-secondary rounded-sm group-hover:bg-secondary group-hover:text-primary transition-all duration-300">
                                        <Icon size={28} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-xl font-serif font-bold text-primary mb-4">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-primary/60 text-sm leading-relaxed">
                                        {pillar.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
