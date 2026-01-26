import { getDictionary, Locale } from "@/lib/i18n/get-dictionary";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SectorsHero from "@/components/sectors/SectorsHero";
import OrgSegments from "@/components/sectors/OrgSegments";
import SectorGrid from "@/components/sectors/SectorGrid";
import SectorEngagement from "@/components/sectors/SectorEngagement";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    return {
        title: dict.meta.title,
        description: dict.meta.description,
    };
}

export default async function SectorsPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return (
        <main className="min-h-screen">
            <Header locale={locale} dict={dict} />

            <SectorsHero dict={dict} />
            <OrgSegments dict={dict} />
            <SectorGrid dict={dict} />
            <SectorEngagement dict={dict} />

            <Footer locale={locale} dict={dict} />
        </main>
    );
}
