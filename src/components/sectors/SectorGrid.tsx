import {
    Building2,
    Factory,
    Rss,
    Globe2,
    BarChart4
} from "lucide-react";

interface SectorGridProps {
    dict: any;
}

const sectorIcons: Record<string, any> = {
    finance: Building2,
    energy: Factory,
    telecom: Rss,
    public: Globe2,
    multisector: BarChart4,
};

export default function SectorGrid({ dict }: SectorGridProps) {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif text-primary mb-6">
                        {dict.sectors_page.industries.title}
                    </h2>
                    <div className="w-16 h-1 bg-secondary mx-auto" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
                    {dict.sectors_page.industries.list.map((sector: any) => {
                        const Icon = sectorIcons[sector.id];
                        return (
                            <div key={sector.id} className="p-8 border border-gray-100 flex flex-col items-center text-center group hover:bg-primary transition-all duration-300 rounded-sm cursor-default">
                                <div className="mb-6 text-secondary group-hover:text-white transition-colors">
                                    <Icon size={32} strokeWidth={1} />
                                </div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-primary/80 group-hover:text-white leading-relaxed">
                                    {sector.title}
                                </h4>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
