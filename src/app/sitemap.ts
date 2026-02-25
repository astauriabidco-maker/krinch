import { MetadataRoute } from 'next';
import { getPosts } from '@/services/posts';
import { BlogPost } from '@prisma/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.krinchpartners.com';
    const locales = ['fr', 'en'];
    const routes = ['', '/about', '/insights', '/careers', '/contact'];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    // Static pages
    locales.forEach((locale) => {
        routes.forEach((route) => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: route === '' ? 1 : 0.8,
            });
        });
    });

    // Dynamic blog posts
    const posts = await getPosts() as BlogPost[];
    posts.forEach((post) => {
        locales.forEach((locale) => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/insights/${post.slug}`,
                lastModified: post.updatedAt || post.publishedAt || new Date(),
                changeFrequency: 'monthly',
                priority: 0.7,
            });
        });
    });

    return sitemapEntries;
}
