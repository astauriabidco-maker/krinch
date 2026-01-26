import { ShieldCheck, Target, Link } from "lucide-react";

interface VisionSectionProps {
    dict: any;
}

export default function VisionSection({ dict }: VisionSectionProps) {
    const visionItems = [
        { key: 'governance', icon: ShieldCheck },
        { key: 'engagement', icon: Target },
        { key: 'alignment', icon: Link },
    ];

    return (
        <section className="py-24 bg-[#F5F7FA]">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl md:text-5xl font-serif text-primary mb-6">
                        {dict.vision.title}
                    </h2>
                    <p className="text-primary/60 italic font-serif">
                        {dict.vision.subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {visionItems.map(({ key, icon: Icon }) => (
                        <div key={key} className="text-center group">
                            <div className="mb-6 p-5 inline-block bg-white rounded-full text-secondary shadow-sm group-hover:scale-110 transition-transform duration-300">
                                <Icon size={32} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-primary mb-4">
                                {dict.vision[key]?.title || ''}
                            </h3>
                            <p className="text-primary/60 text-sm leading-relaxed max-w-xs mx-auto">
                                {dict.vision[key]?.desc || ''}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
