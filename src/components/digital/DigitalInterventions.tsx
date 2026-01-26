import { ChevronRight } from "lucide-react";

interface DigitalInterventionsProps {
    dict: any;
}

export default function DigitalInterventions({ dict }: DigitalInterventionsProps) {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-serif text-primary mb-6">
                        {dict.domains.title}
                    </h2>
                    <div className="w-12 h-1 bg-secondary mx-auto" />
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {dict.domains.items.map((item: any, index: number) => (
                        <div
                            key={index}
                            className={`p-10 transition-all duration-500 rounded-sm ${item.focus
                                    ? 'bg-[#F0F7FF] border-2 border-secondary shadow-xl scale-105 z-10'
                                    : 'bg-white border border-gray-100 hover:shadow-2xl'
                                }`}
                        >
                            <div className="flex items-start gap-6">
                                <div className={`mt-2 w-8 h-px bg-secondary ${item.focus ? 'w-12 h-0.5' : ''}`} />
                                <div>
                                    <h3 className={`text-2xl font-serif text-primary mb-4 ${item.focus ? 'text-[#1E4D7B]' : ''}`}>
                                        {item.title}
                                    </h3>
                                    <p className="text-primary/70 text-sm leading-relaxed mb-6">
                                        {item.desc}
                                    </p>
                                    <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-widest cursor-pointer group">
                                        <span>En savoir plus</span>
                                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
