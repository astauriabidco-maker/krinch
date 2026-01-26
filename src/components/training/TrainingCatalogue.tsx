import { ChevronRight } from "lucide-react";

interface TrainingCatalogueProps {
    dict: any;
}

export default function TrainingCatalogue({ dict }: TrainingCatalogueProps) {
    const domainKeys = ['rh', 'management', 'transformation', 'digital'];

    return (
        <section className="py-24 bg-[#FAFAFA]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif text-primary mb-6">
                        {dict.catalogue.title}
                    </h2>
                    <div className="w-16 h-1 bg-secondary mx-auto" />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {domainKeys.map((key) => {
                        const domain = dict.catalogue.domains[key];
                        return (
                            <div key={key} className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                                {domain.badge && (
                                    <div className="absolute top-4 right-4 bg-secondary text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                                        {domain.badge}
                                    </div>
                                )}
                                <h3 className="text-2xl font-serif text-primary mb-8 border-b border-gray-50 pb-4 group-hover:text-secondary transition-colors">
                                    {domain.title}
                                </h3>

                                <div className="grid gap-4">
                                    {domain.modules.map((module: string, idx: number) => (
                                        <div key={idx} className="flex items-center justify-between p-4 bg-[#F9F9F9] hover:bg-primary hover:text-white transition-all cursor-pointer rounded-sm">
                                            <span className="text-sm font-sans tracking-tight">{module}</span>
                                            <ChevronRight size={16} className="text-secondary" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
