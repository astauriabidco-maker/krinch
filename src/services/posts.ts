import { db } from '@/lib/db';
import { BlogPostSchema } from '@/lib/schemas';
import { z } from 'zod';

export type CreatePostDTO = z.infer<typeof BlogPostSchema>;

/**
 * Récupère les articles avec optimisation linguistique.
 * Si une locale est fournie, retourne une structure aplatie simplifiée.
 */
export async function getPosts(locale?: string, includeDrafts: boolean = false) {
    const posts = await db.blogPost.findMany({
        where: includeDrafts ? {} : { published: true },
        orderBy: { publishedAt: 'desc' },
    });

    if (!locale) return posts;

    // Projection / Mapping pour le frontend (Optimisation donnée au client)
    return posts.map(p => ({
        id: p.id,
        slug: p.slug,
        title: locale === 'fr' ? p.titleFr : p.titleEn,
        summary: locale === 'fr' ? p.summaryFr : p.summaryEn,
        content: locale === 'fr' ? p.contentFr : p.contentEn,
        coverImage: p.coverImage,
        category: p.category,
        publishedAt: p.publishedAt
    }));
}

export async function createPost(data: CreatePostDTO) {
    return await db.blogPost.create({
        data: {
            ...data,
            slug: data.slug || data.titleEn.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
        }
    });
}

export async function updatePost(id: string, data: Partial<CreatePostDTO>) {
    return await db.blogPost.update({
        where: { id },
        data
    });
}

export async function getPostBySlug(slug: string) {
    return await db.blogPost.findUnique({
        where: { slug }
    });
}

export async function getPostById(id: string) {
    return await db.blogPost.findUnique({
        where: { id }
    });
}

export async function deletePost(id: string) {
    return await db.blogPost.delete({
        where: { id }
    });
}

export async function togglePostPublished(id: string, published: boolean) {
    return await db.blogPost.update({
        where: { id },
        data: {
            published,
            publishedAt: published ? new Date() : null
        }
    });
}
