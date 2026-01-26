interface EngagementFooterProps {
    dict: any;
}

export default function EngagementFooter({ dict }: EngagementFooterProps) {
    return (
        <section className="py-24 bg-primary text-center">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-8 leading-tight">
                        {dict.services_page.engagement.title}
                    </h2>
                    <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto italic font-serif leading-relaxed">
                        {dict.services_page.engagement.text}
                    </p>

                    <button className="bg-secondary text-primary px-12 py-6 text-sm font-bold uppercase tracking-[0.2em] hover:bg-white transition-all shadow-2xl hover:-translate-y-1">
                        {dict.services_page.engagement.cta}
                    </button>
                </div>
            </div>
        </section>
    );
}
