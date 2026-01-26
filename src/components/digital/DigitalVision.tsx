import { Search, ShieldCheck, Zap, Scale } from "lucide-react";

interface DigitalVisionProps {
    dict: any;
}

const visionIcons = [Search, ShieldCheck, Zap, Scale];

export default function DigitalVision({ dict }: DigitalVisionProps) {
    return (
        <section className="py-24 bg-[#0F2A44] text-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20 animate-reveal">
                    <h2 className="text-3xl md:text-5xl font-serif mb-8">
                        {dict.vision.title}
                    </h2>
                    <div className="w-16 h-1 bg-secondary mx-auto" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {dict.vision.pillars.map((pillar: any, index: number) => {
                        const Icon = visionIcons[index];
                        return (
                            <div key={index} className="group p-8 border border-white/10 hover:border-secondary/50 transition-all duration-500 rounded-sm">
                                <div className="mb-8 text-secondary group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(201,162,77,0.5)] transition-all duration-300">
                                    <Icon size={40} strokeWidth={1} />
                                </div>
                                <h3 className="text-xl font-serif font-bold mb-4 tracking-wide group-hover:text-secondary transition-colors">
                                    {pillar.title}
                                </h3>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    {pillar.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
