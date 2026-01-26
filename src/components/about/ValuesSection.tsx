import { Star, Shield, Zap, HeartHandshake } from "lucide-react";

interface ValuesSectionProps {
    dict: any;
}

const valueIcons = [Star, Shield, Zap, HeartHandshake];

export default function ValuesSection({ dict }: ValuesSectionProps) {
    return (
        <section className="py-24 bg-[#FAFAFA]">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl md:text-5xl font-serif text-primary mb-6">
                        {dict.values.title}
                    </h2>
                    <div className="w-20 h-1 bg-secondary mx-auto" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {dict.values.items.map((item: any, index: number) => {
                        const Icon = valueIcons[index];
                        return (
                            <div key={index} className="p-10 bg-white border border-gray-100 hover:shadow-2xl transition-all group rounded-sm">
                                <div className="mb-8 text-secondary group-hover:scale-110 transition-transform duration-300">
                                    <Icon size={40} strokeWidth={1} />
                                </div>
                                <h3 className="text-xl font-serif font-bold text-primary mb-4">
                                    {item.title}
                                </h3>
                                <p className="text-primary/60 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
