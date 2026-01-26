import { getDictionary, Locale } from "@/lib/i18n/get-dictionary";
import ArticlePage from "@/components/insights/ArticlePage";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
    const { locale, slug } = await params;
    const dict = await getDictionary(locale);
    const article = dict.articles.find((a: any) => a.slug === slug);

    if (!article) return { title: "Article Not Found" };

    return {
        title: `${article.title} | Krinch & Partners`,
        description: article.excerpt,
    };
}

export default async function Page({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
    const { locale, slug } = await params;
    const dict = await getDictionary(locale);
    const article = dict.articles.find((a: any) => a.slug === slug);

    if (!article) notFound();

    return <ArticlePage article={article} dict={dict} locale={locale} />;
}
