import { getDictionary, Locale } from "@/lib/i18n/get-dictionary";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    return {
        title: dict.meta.title,
        description: dict.meta.description,
        robots: "index, follow",
    };
}

export default async function LegalPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    const l = dict.legal_page;

    return (
        <main className="min-h-screen bg-white">
            <Header locale={locale} dict={dict} />

            <div className="pt-40 pb-24 px-6">
                <div className="container mx-auto max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-serif text-primary mb-16 animate-fade-in">
                        {l.title}
                    </h1>

                    {/* Table of Contents */}
                    <div className="bg-[#FAFAFA] p-8 mb-20 rounded-sm border border-gray-100">
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-secondary mb-6">
                            {l.summary.title}
                        </h2>
                        <ul className="space-y-4">
                            {l.summary.items.map((item: any) => (
                                <li key={item.id}>
                                    <Link
                                        href={`#${item.id}`}
                                        className="text-sm text-primary/60 hover:text-secondary transition-colors border-b border-transparent hover:border-secondary"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Content */}
                    <div className="space-y-20 font-sans text-primary/80 leading-relaxed text-sm">
                        {Object.entries(l.sections).map(([id, section]: [string, any]) => (
                            <section key={id} id={id} className="scroll-mt-32">
                                <h2 className="text-2xl font-serif text-primary mb-6">
                                    {section.title}
                                </h2>
                                <div className="prose prose-sm prose-primary max-w-none">
                                    {section.content.split('\n').map((line: string, i: number) => {
                                        // Highlight placeholders
                                        const parts = line.split(/(\[.*?\])/g);
                                        return (
                                            <p key={i} className="mb-4">
                                                {parts.map((part, j) => (
                                                    part.startsWith('[') && part.endsWith(']')
                                                        ? <span key={j} className="text-[#888] font-medium italic">{part}</span>
                                                        : part
                                                ))}
                                            </p>
                                        );
                                    })}
                                </div>
                            </section>
                        ))}
                    </div>

                    <div className="mt-24 pt-10 border-t border-gray-100 text-center">
                        <p className="text-[10px] uppercase tracking-widest text-primary/40 font-bold">
                            © {new Date().getFullYear()} Krinch & Partners - {l.title}
                        </p>
                    </div>
                </div>
            </div>

            <Footer locale={locale} dict={dict} />
        </main>
    );
}
