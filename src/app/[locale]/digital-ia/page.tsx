import { getDictionary, Locale } from "@/lib/i18n/get-dictionary";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DigitalHero from "@/components/digital/DigitalHero";
import DigitalVision from "@/components/digital/DigitalVision";
import DigitalInterventions from "@/components/digital/DigitalInterventions";
import DigitalValueAdded from "@/components/digital/DigitalValueAdded";
import InsightIA from "@/components/digital/InsightIA";
import IAReadyQuiz from "@/components/quiz/IAReadyQuiz";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    return {
        title: dict.meta.title,
        description: dict.meta.description,
    };
}

export default async function DigitalIAPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return (
        <main className="min-h-screen">
            <Header locale={locale} dict={dict} />

            <DigitalHero dict={dict} />
            <DigitalVision dict={dict} />
            <DigitalInterventions dict={dict} />
            <DigitalValueAdded dict={dict} />

            {/* Dynamic Insight Section */}
            <section className="bg-white pb-24">
                <div className="container mx-auto px-6">
                    <InsightIA dict={dict} />
                </div>
            </section>

            {/* IA Ready Diagnostic Section */}
            <section id="ia-ready-quiz" className="scroll-mt-20">
                <IAReadyQuiz dict={dict} locale={locale} />
            </section>

            <Footer locale={locale} dict={dict} />
        </main>
    );
}
