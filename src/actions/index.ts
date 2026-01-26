'use server'

import { createLead } from '../services/leads';
import { requireAdmin, requireEditor } from '../lib/security';
import { createPost, updatePost } from '../services/posts';
import { revalidatePath } from 'next/cache';
import { LeadSchema, BlogPostSchema } from '../lib/schemas';

// --- LEADS ---

export async function submitLeadAction(formData: FormData) {
    // Convertit FormData en objet simple
    const rawData: any = {};
    formData.forEach((value, key) => {
        // Gestion simpliste des objets JSON si nécessaire, sinon string
        if (key === 'answers' || key === 'score') {
            try { rawData[key] = JSON.parse(value as string); } catch { rawData[key] = value; }
        } else {
            rawData[key] = value;
        }
    });

    // Validation
    const validatedFields = LeadSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return { success: false, errors: validatedFields.error.flatten().fieldErrors };
    }

    // Appel Service
    const result = await createLead(validatedFields.data);
    return result;
}


// --- BLOG (Protected) ---

export async function createBlogPostAction(data: any) {
    try {
        await requireEditor(); // Protection
        const validated = BlogPostSchema.parse(data);
        await createPost(validated);
        revalidatePath('/insights');
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function updateBlogPostAction(id: string, data: any) {
    try {
        await requireEditor(); // Protection
        // Note: On pourrait utiliser partial() de Zod ici
        await updatePost(id, data);
        revalidatePath('/insights');
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

// --- SYSTEM ---

export async function exportLeadsAction() {
    try {
        await requireAdmin();
        // Logique d'export CSV à implémenter si besoin
        return { success: true, message: "Export non implémenté" };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
