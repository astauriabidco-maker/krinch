import { getDictionary, Locale } from "@/lib/i18n/get-dictionary";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import { Lock, Mail } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    return {
        title: dict.meta.title,
        description: dict.meta.description,
        robots: "noindex, follow", // As requested: accessible but not priority for search engines
    };
}

export default async function PrivacyPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    const p = dict.privacy_page;

    return (
        <main className="min-h-screen bg-white">
            <Header locale={locale} dict={dict} />

            <div className="pt-40 pb-24 px-6">
                <div className="container mx-auto max-w-3xl">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-2 bg-secondary/10 rounded-full text-secondary">
                            <Lock size={20} strokeWidth={2.5} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                            {p.badge}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-serif text-primary mb-12 animate-fade-in">
                        {p.title}
                    </h1>

                    <p className="text-lg text-primary/60 font-serif italic mb-16 leading-relaxed border-l-4 border-secondary/20 pl-8">
                        {p.intro}
                    </p>

                    <div className="space-y-16 font-sans text-primary/80 leading-relaxed text-sm">
                        {p.sections.map((section: any, index: number) => (
                            <section key={index} className="animate-reveal">
                                <h2 className="text-2xl font-serif text-primary mb-6">
                                    {section.title}
                                </h2>
                                <p className="mb-6">{section.content}</p>

                                {section.list && (
                                    <ul className="space-y-3 mb-6">
                                        {section.list.map((item: string, i: number) => (
                                            <li key={i} className="flex items-start gap-4">
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {section.contact_email && (
                                    <div className="mt-8 p-6 bg-[#FAFAFA] rounded-sm border-l-2 border-primary flex items-center gap-4 group">
                                        <Mail size={18} className="text-secondary" />
                                        <a
                                            href={`mailto:${section.contact_email}`}
                                            className="text-primary font-bold hover:text-secondary transition-colors border-b border-primary/10 hover:border-secondary"
                                        >
                                            {section.contact_email}
                                        </a>
                                    </div>
                                )}
                            </section>
                        ))}
                    </div>

                    <div className="mt-20 pt-10 border-t border-gray-100 italic text-primary/40 text-xs">
                        <a href="#" className="hover:text-secondary transition-colors">
                            {p.cookies_link}
                        </a>
                    </div>
                </div>
            </div>

            <Footer locale={locale} dict={dict} />
        </main>
    );
}
