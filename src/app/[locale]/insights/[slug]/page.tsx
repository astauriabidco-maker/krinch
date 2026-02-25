import { getDictionary, Locale } from "@/lib/i18n/get-dictionary";
import { getPostBySlug } from "@/services/posts";
import ArticlePage from "@/components/insights/ArticlePage";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
    const { locale, slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) return { title: "Article Not Found" };

    const title = locale === 'fr' ? post.titleFr : post.titleEn;
    const description = locale === 'fr' ? post.summaryFr : post.summaryEn;

    const baseUrl = 'https://www.krinchpartners.com';
    const url = `${baseUrl}/${locale}/insights/${post.slug}`;
    const image = post.coverImage || `${baseUrl}/images/insights/${post.category.toLowerCase()}.png`;

    return {
        title: `${title} | Krinch & Partners`,
        description,
        openGraph: {
            title,
            description,
            url,
            type: 'article',
            publishedTime: post.publishedAt?.toISOString() || new Date().toISOString(),
            authors: [post.author || 'Krinch & Partners'],
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
    };
}

export default async function Page({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
    const { locale, slug } = await params;
    const dict = await getDictionary(locale);
    const post = await getPostBySlug(slug);

    if (!post) notFound();

    // Map to frontend-friendly format
    const article = {
        slug: post.slug,
        title: locale === 'fr' ? post.titleFr : post.titleEn,
        excerpt: locale === 'fr' ? post.summaryFr : post.summaryEn,
        content: locale === 'fr' ? post.contentFr : post.contentEn,
        category: post.category.toLowerCase(),
        categoryLabel: getCategoryLabel(post.category, locale),
        image: post.coverImage || `/images/insights/${post.category.toLowerCase()}.png`,
        date: post.publishedAt ? formatDate(post.publishedAt, locale) : '',
        readTime: estimateReadTime(post.contentFr),
        author: post.author,
    };

    return <ArticlePage article={article} dict={dict} locale={locale} />;
}

function getCategoryLabel(cat: string, locale: string): string {
    const labels: Record<string, Record<string, string>> = {
        STRATEGY: { fr: "Stratégie & Leadership", en: "Strategy & Leadership" },
        IA: { fr: "IA RH & Data", en: "HR AI & Data" },
        DIGITAL: { fr: "Transformation Digitale", en: "Digital Transformation" },
        HR: { fr: "Ressources Humaines", en: "Human Resources" },
    };
    return labels[cat]?.[locale] || cat;
}

function formatDate(date: Date, locale: string): string {
    return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
        day: 'numeric', month: 'short', year: 'numeric'
    }).format(date);
}

function estimateReadTime(content: string): string {
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.max(3, Math.ceil(words / 200));
    return `${minutes} min read`;
}
