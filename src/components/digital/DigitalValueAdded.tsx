import { TrendingUp, Link, Globe, Palette } from "lucide-react";

interface DigitalValueAddedProps {
    dict: any;
}

const valueIcons = [TrendingUp, Link, Globe, Palette];

export default function DigitalValueAdded({ dict }: DigitalValueAddedProps) {
    return (
        <section className="py-24 bg-[#FAFAFA]">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-serif text-primary mb-20">
                    {dict.value_added.title}
                </h2>

                <div className="grid md:grid-cols-4 gap-12">
                    {dict.value_added.items.map((item: any, index: number) => {
                        const Icon = valueIcons[index];
                        return (
                            <div key={index} className="flex flex-col items-center group">
                                <div className={`mb-8 p-6 rounded-full transition-all duration-500 ${item.highlight
                                        ? 'bg-secondary text-primary scale-110 shadow-lg'
                                        : 'bg-white text-secondary border border-gray-100'
                                    }`}>
                                    <Icon size={32} strokeWidth={1} />
                                </div>
                                <h4 className={`text-sm font-bold uppercase tracking-[0.2em] mb-4 ${item.highlight ? 'text-primary' : 'text-primary/80'
                                    }`}>
                                    {item.title}
                                </h4>
                                <p className="text-xs text-primary/50 leading-relaxed max-w-[200px] mx-auto">
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
