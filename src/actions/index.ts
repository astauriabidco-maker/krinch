'use server'

import { createLead } from '@/services/leads';
import { requireAdmin, requireEditor } from '@/lib/security';
import { createPost, updatePost, deletePost, togglePostPublished } from '@/services/posts';
import { revalidatePath } from 'next/cache';
import { LeadSchema, BlogPostSchema } from '@/lib/schemas';
import { z } from 'zod';

// --- LEADS ---

export async function submitLeadAction(formData: FormData) {
    const rawData: Record<string, unknown> = {};
    formData.forEach((value, key) => {
        if (key === 'answers' || key === 'score') {
            try { rawData[key] = JSON.parse(value as string); } catch { rawData[key] = value; }
        } else {
            rawData[key] = value;
        }
    });

    const validatedFields = LeadSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return { success: false, errors: validatedFields.error.flatten().fieldErrors };
    }

    const result = await createLead(validatedFields.data);
    return result;
}


// --- BLOG (Protected) ---

export async function createBlogPostAction(data: z.infer<typeof BlogPostSchema>) {
    try {
        await requireEditor();
        const validated = BlogPostSchema.parse(data);
        await createPost(validated);
        revalidatePath('/insights');
        return { success: true };
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Erreur inconnue';
        return { success: false, error: message };
    }
}

export async function updateBlogPostAction(id: string, data: Partial<z.infer<typeof BlogPostSchema>>) {
    try {
        await requireEditor();
        const validated = BlogPostSchema.partial().parse(data);
        await updatePost(id, validated);
        revalidatePath('/insights');
        return { success: true };
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Erreur inconnue';
        return { success: false, error: message };
    }
}

export async function deleteBlogPostAction(id: string) {
    try {
        await requireEditor();
        await deletePost(id);
        revalidatePath('/insights');
        revalidatePath('/admin/blog');
        return { success: true };
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Erreur inconnue';
        return { success: false, error: message };
    }
}

export async function toggleBlogPostPublishedAction(id: string, published: boolean) {
    try {
        await requireEditor();
        await togglePostPublished(id, published);
        revalidatePath('/insights');
        revalidatePath('/admin/blog');
        return { success: true };
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Erreur inconnue';
        return { success: false, error: message };
    }
}

// --- SYSTEM ---

export async function exportLeadsAction() {
    try {
        await requireAdmin();
        const { getLeads } = await import('@/services/leads');
        const leads = await getLeads();
        return { success: true, data: JSON.parse(JSON.stringify(leads)) };
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Erreur inconnue';
        return { success: false, error: message };
    }
}
