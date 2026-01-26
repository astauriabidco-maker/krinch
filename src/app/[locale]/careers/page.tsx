import { getDictionary, Locale } from "@/lib/i18n/get-dictionary";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CareersHero from "@/components/careers/CareersHero";
import CareersCulture from "@/components/careers/CareersCulture";
import CareersJobs from "@/components/careers/CareersJobs";
import CareersProcess from "@/components/careers/CareersProcess";
import CareersForm from "@/components/careers/CareersForm";
import { Quote } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    return {
        title: dict.meta.title,
        description: dict.meta.description,
    };
}

export default async function CareersPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    const testimonial = dict.careers_page.testimonial;

    return (
        <main className="min-h-screen">
            <Header locale={locale} dict={dict} />

            <CareersHero dict={dict} />
            <CareersCulture dict={dict} />

            {/* Testimonial Section */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto relative p-12 md:p-20 bg-[#FAFAFA] rounded-sm group">
                        <div className="absolute top-10 right-10 text-secondary/10 group-hover:text-secondary/20 transition-colors">
                            <Quote size={120} />
                        </div>
                        <div className="relative z-10">
                            <p className="text-2xl md:text-3xl font-serif text-primary italic leading-relaxed mb-12">
                                "{testimonial.text}"
                            </p>
                            <div>
                                <h4 className="font-bold text-primary uppercase tracking-widest text-sm mb-1">{testimonial.author}</h4>
                                <p className="text-xs text-secondary font-bold uppercase tracking-[0.2em]">{testimonial.role}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CareersJobs dict={dict} />
            <CareersProcess dict={dict} />
            <CareersForm dict={dict} />

            <Footer locale={locale} dict={dict} />
        </main>
    );
}
