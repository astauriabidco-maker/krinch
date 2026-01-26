import Reveal from "@/components/ui/Reveal";

interface SectorsPreviewProps {
    dict: any;
}

export default function SectorsPreview({ dict }: SectorsPreviewProps) {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <Reveal width="100%">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 border-t border-b border-gray-100 py-12">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-2xl font-serif text-primary">
                                {dict.sectors_preview.title}
                            </h2>
                        </div>

                        <div className="w-full md:w-2/3 flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-4">
                            {dict.sectors_preview.items.map((item: string, index: number) => (
                                <div key={index} className="flex items-center gap-6">
                                    <span className="text-sm font-bold uppercase tracking-widest text-primary/50 whitespace-nowrap">
                                        {item}
                                    </span>
                                    {index < dict.sectors_preview.items.length - 1 && (
                                        <span className="text-secondary font-bold">•</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
