import { getDictionary, Locale } from "@/lib/i18n/get-dictionary";
import HomePage from "@/components/home/HomePage";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: dict.hero.title,
    description: dict.hero.subtitle,
  };
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <HomePage dict={dict} locale={locale} />;
}
