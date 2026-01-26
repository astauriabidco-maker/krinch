import { getDictionary, Locale } from "@/lib/i18n/get-dictionary";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TrainingHero from "@/components/training/TrainingHero";
import TrainingCatalogue from "@/components/training/TrainingCatalogue";
import FormatsPublics from "@/components/training/FormatsPublics";
import QualitySeal from "@/components/training/QualitySeal";
import FinalCTA from "@/components/training/FinalCTA";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    return {
        title: dict.meta.title,
        description: dict.meta.description,
    };
}

export default async function TrainingPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return (
        <main className="min-h-screen">
            <Header locale={locale} dict={dict} />

            <TrainingHero dict={dict} />
            <TrainingCatalogue dict={dict} />
            <FormatsPublics dict={dict} />
            <QualitySeal dict={dict} />
            <FinalCTA dict={dict} />

            <Footer locale={locale} dict={dict} />
        </main>
    );
}
