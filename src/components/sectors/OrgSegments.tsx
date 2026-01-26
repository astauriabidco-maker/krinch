interface OrgSegmentsProps {
    dict: any;
}

export default function OrgSegments({ dict }: OrgSegmentsProps) {
    const segmentKeys = ['pme', 'ge', 'institutions', 'ong'];

    return (
        <section className="py-24 bg-[#FAFAFA]">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {segmentKeys.map((key) => {
                        const segment = dict.sectors_page.segments[key];
                        const isPME = key === 'pme';
                        return (
                            <div
                                key={key}
                                className={`p-8 bg-white border flex flex-col h-full transition-all duration-500 group rounded-sm ${isPME
                                        ? 'border-secondary shadow-xl scale-105 z-10 relative bg-[#FFFDF9]'
                                        : 'border-gray-100 hover:border-secondary/20 hover:shadow-2xl'
                                    }`}
                            >
                                {isPME && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-primary px-3 py-1 text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">
                                        Cœur de métier
                                    </div>
                                )}

                                <h3 className={`text-2xl font-serif text-primary mb-8 ${isPME ? 'text-primary' : 'group-hover:text-secondary'} transition-colors`}>
                                    {segment.title}
                                </h3>

                                <ul className="space-y-4 mb-10 flex-grow">
                                    {segment.points.map((point: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-primary/60">
                                            <div className="mt-1.5 w-1.5 h-px bg-secondary" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto pt-6 border-t border-gray-50">
                                    <div className={`p-4 rounded-sm border-l-2 ${isPME ? 'bg-secondary/10 border-secondary' : 'bg-gray-50 border-gray-200'}`}>
                                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">
                                            {segment.highlight}
                                        </p>
                                        <p className="text-xs text-primary/80 leading-relaxed italic">
                                            {segment.result}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
