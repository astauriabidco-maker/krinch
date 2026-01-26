import { getDictionary, Locale } from "@/lib/i18n/get-dictionary";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    return {
        title: dict.meta.title,
        description: dict.meta.description,
    };
}

export default async function ContactPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return (
        <main className="min-h-screen">
            <Header locale={locale} dict={dict} />

            <div className="grid lg:grid-cols-2 pt-20 overflow-hidden">
                <ContactInfo dict={dict} />
                <ContactForm dict={dict} />
            </div>

            <Footer locale={locale} dict={dict} />
        </main>
    );
}
