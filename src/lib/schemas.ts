import { z } from 'zod';

export const LeadSchema = z.object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Adresse email invalide"),
    phone: z.string().optional(),
    company: z.string().optional(),
    companySize: z.string().optional(),
    serviceInterest: z.string().optional(),
    answers: z.record(z.any()).optional(), // Pour le Quiz
    score: z.number().optional()
});

export const BlogPostSchema = z.object({
    slug: z.string().min(3),
    titleFr: z.string().min(5),
    titleEn: z.string().min(5),
    summaryFr: z.string(),
    summaryEn: z.string(),
    contentFr: z.string(),
    contentEn: z.string(),
    coverImage: z.string().url().optional(),
    category: z.enum(['STRATEGY', 'IA', 'DIGITAL', 'HR']),
    published: z.boolean().default(false),
});

export const PageContentSchema = z.object({
    pageKey: z.string(),
    sectionKey: z.string(),
    key: z.string(),
    contentFr: z.string(),
    contentEn: z.string(),
});
export const TeamMemberSchema = z.object({
    name: z.string().min(2),
    roleFr: z.string().min(2),
    roleEn: z.string().min(2),
    bioFr: z.string().optional(),
    bioEn: z.string().optional(),
    photoUrl: z.string().url().optional().or(z.literal("")),
    linkedinUrl: z.string().url().optional().or(z.literal("")),
    order: z.number().int().default(0),
});
