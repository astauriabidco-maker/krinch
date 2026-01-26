import { getDictionary, Locale } from "@/lib/i18n/get-dictionary";
import InsightsPage from "@/components/insights/InsightsPage";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    return {
        title: dict.meta.title,
        description: dict.meta.description,
    };
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return <InsightsPage dict={dict} locale={locale} />;
}
