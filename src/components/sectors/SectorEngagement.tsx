interface SectorEngagementProps {
    dict: any;
}

export default function SectorEngagement({ dict }: SectorEngagementProps) {
    return (
        <section className="py-24 bg-[#0F2A44] text-white">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {dict.sectors_page.engagement.pillars.map((pillar: any, index: number) => (
                        <div key={index} className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-secondary" />
                                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">
                                    {pillar.title}
                                </h3>
                            </div>
                            <p className="text-sm text-white/60 leading-relaxed font-sans mt-2 border-l border-white/10 pl-5">
                                {pillar.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
