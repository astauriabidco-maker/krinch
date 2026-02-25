import Link from "next/link";

interface FinalCTAProps {
    dict: any;
    locale: string;
}

export default function FinalCTA({ dict, locale }: FinalCTAProps) {
    return (
        <section className="py-24 bg-primary relative overflow-hidden">
            {/* Subtle patterns */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute top-10 left-10 text-[20rem] font-serif font-bold text-white uppercase tracking-tighter select-none">K&P</div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-12 leading-tight">
                        {dict.final_cta.text}
                    </h2>

                    <Link
                        href={`/${locale}/contact`}
                        className="inline-block bg-secondary text-primary px-12 py-6 text-sm font-bold uppercase tracking-[0.2em] hover:bg-white transition-all shadow-2xl hover:-translate-y-1"
                    >
                        {dict.final_cta.button}
                    </Link>
                </div>
            </div>
        </section>
    );
}
