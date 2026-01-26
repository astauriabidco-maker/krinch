import { getDictionary, Locale } from "@/lib/i18n/get-dictionary";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/about/AboutHero";
import VisionSection from "@/components/about/VisionSection";
import ExpertSection from "@/components/about/ExpertSection";
import ApproachSection from "@/components/about/ApproachSection";
import ValuesSection from "@/components/about/ValuesSection";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    return {
        title: dict.meta.title,
        description: dict.meta.description,
    };
}

export default async function AboutPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return (
        <main className="min-h-screen">
            <Header locale={locale} dict={dict} />

            <AboutHero dict={dict} />
            <VisionSection dict={dict} />
            <ExpertSection dict={dict} />
            <ApproachSection dict={dict} />
            <ValuesSection dict={dict} />

            <Footer locale={locale} dict={dict} />
        </main>
    );
}
