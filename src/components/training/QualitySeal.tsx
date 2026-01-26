import Image from "next/image";

interface QualitySealProps {
    dict: any;
}

export default function QualitySeal({ dict }: QualitySealProps) {
    return (
        <section className="py-24 bg-[#F5F7FA]">
            <div className="container mx-auto px-6">
                <div className="bg-white p-12 md:p-20 border-t-8 border-secondary relative shadow-2xl overflow-hidden">
                    {/* Decorative watermark */}
                    <div className="absolute top-10 right-10 text-8xl font-serif text-gray-50 uppercase tracking-tighter select-none font-bold">EXCELLENCE</div>

                    <div className="relative z-10">
                        <div className="flex flex-col lg:flex-row gap-16 items-center">
                            <div className="w-full lg:w-1/2">
                                <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">
                                    {dict.quality.title}
                                </h2>
                                <p className="text-primary/60 italic font-serif mb-12">
                                    {dict.quality.subtitle}
                                </p>

                                <div className="relative">
                                    <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-100" />
                                    <div className="space-y-10">
                                        {dict.quality.timeline.map((step: any, index: number) => (
                                            <div key={index} className="flex gap-8 items-start relative overflow-hidden group">
                                                <div className="z-10 w-8 h-8 rounded-full bg-white border border-secondary flex items-center justify-center text-secondary text-xs font-bold group-hover:bg-secondary group-hover:text-primary transition-all">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
                                                        {step.label}
                                                    </h4>
                                                    <p className="text-xs text-primary/50 leading-relaxed">
                                                        {step.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/2">
                                <div className="relative aspect-video rounded-sm overflow-hidden shadow-xl border border-gray-100">
                                    <Image
                                        src="/images/training_masterclass.png"
                                        alt="Krinch & Partners Masterclass"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
