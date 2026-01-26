import { FileText } from "lucide-react";

interface FinalCTAProps {
    dict: any;
}

export default function FinalCTA({ dict }: FinalCTAProps) {
    return (
        <section className="py-24 bg-white text-center">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto border-t border-b border-gray-100 py-20">
                    <h2 className="text-3xl md:text-5xl font-serif text-primary mb-12 leading-tight">
                        {dict.cta.title}
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                        <button className="w-full sm:w-auto bg-primary text-white border border-primary px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-secondary hover:text-primary hover:border-secondary transition-all">
                            {dict.cta.button}
                        </button>
                        <button className="w-full sm:w-auto group flex items-center justify-center gap-4 bg-white text-primary border border-gray-200 px-10 py-5 text-sm font-bold uppercase tracking-widest hover:border-secondary transition-all">
                            <FileText size={18} className="text-secondary group-hover:scale-110 transition-transform" />
                            {dict.cta.brochure}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
