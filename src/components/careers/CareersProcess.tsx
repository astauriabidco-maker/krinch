interface CareersProcessProps {
    dict: any;
}

export default function CareersProcess({ dict }: CareersProcessProps) {
    return (
        <section className="py-24 bg-[#0F2A44] text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full translate-x-32 -translate-y-32" />

            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-serif mb-6">
                        {dict.careers_page.process.title}
                    </h2>
                    <div className="w-12 h-1 bg-secondary mx-auto" />
                </div>

                <div className="grid md:grid-cols-4 gap-12 relative">
                    {/* Timeline separator (hidden on mobile) */}
                    <div className="hidden md:block absolute top-[44px] left-0 w-full h-0.5 bg-white/10" />

                    {dict.careers_page.process.steps.map((step: any, index: number) => (
                        <div key={index} className="relative z-10 flex flex-col items-center text-center group">
                            <div className="w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center font-bold text-sm mb-8 shadow-[0_0_20px_rgba(201,162,77,0.3)] group-hover:scale-110 transition-transform">
                                0{index + 1}
                            </div>
                            <h4 className="text-lg font-serif font-bold mb-4 text-white">
                                {step.label}
                            </h4>
                            <p className="text-white/50 text-xs leading-relaxed max-w-[200px]">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
