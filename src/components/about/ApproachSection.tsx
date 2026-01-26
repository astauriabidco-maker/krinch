import Image from "next/image";

interface ApproachSectionProps {
    dict: any;
}

export default function ApproachSection({ dict }: ApproachSectionProps) {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2 order-2 lg:order-1">
                        <div className="relative aspect-square max-w-lg mx-auto">
                            <div className="absolute inset-0 bg-primary/5 rounded-full scale-110 -z-10" />
                            <Image
                                src="/images/approach_abstract.png"
                                alt="Krinch & Partners Methodology"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                    <div className="lg:w-1/2 order-1 lg:order-2">
                        <h2 className="text-3xl md:text-5xl font-serif text-primary mb-8">
                            {dict.approach.title}
                        </h2>
                        <p className="text-primary/60 mb-12 italic font-serif">
                            {dict.approach.subtitle}
                        </p>

                        <div className="space-y-10">
                            {dict.approach.steps.map((step: any, index: number) => (
                                <div key={index} className="flex gap-6 group">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full border border-secondary/30 flex items-center justify-center text-secondary font-serif text-xl group-hover:bg-secondary group-hover:text-primary transition-all duration-300">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-serif font-bold text-primary mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-primary/60 text-sm leading-relaxed max-w-md">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
