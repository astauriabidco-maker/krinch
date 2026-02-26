import { describe, it, expect } from 'vitest'
import { z } from 'zod'
import { LeadSchema, BlogPostSchema, ContactSchema, BrandSettingsSchema } from '@/lib/schemas'

describe('LeadSchema', () => {
    it('validates a complete lead', () => {
        const data = {
            name: 'Jean Dupont',
            email: 'jean@example.com',
            company: 'Acme Corp',
            companySize: '50-200',
            serviceInterest: 'IA',
            score: 85,
            answers: { q1: 'Answer A', q2: 'Answer B' },
        }
        const result = LeadSchema.safeParse(data)
        expect(result.success).toBe(true)
    })

    it('requires name and email', () => {
        const result = LeadSchema.safeParse({ name: 'Test' })
        expect(result.success).toBe(false)
    })

    it('validates email format', () => {
        const result = LeadSchema.safeParse({ name: 'Test', email: 'not-an-email' })
        expect(result.success).toBe(false)
    })

    it('accepts minimal data (name + email)', () => {
        const result = LeadSchema.safeParse({ name: 'Test', email: 'test@example.com' })
        expect(result.success).toBe(true)
    })

    it('accepts optional score as number', () => {
        const data = { name: 'Test', email: 'test@example.com', score: 42 }
        const result = LeadSchema.safeParse(data)
        expect(result.success).toBe(true)
        if (result.success) {
            expect(result.data.score).toBe(42)
        }
    })
})

describe('ContactSchema', () => {
    it('validates a complete contact form', () => {
        const data = {
            name: 'Marie Ngassa',
            email: 'marie@example.com',
            message: 'I need help with HR transformation',
            company: 'MTN',
            subject: 'Consulting Request',
            newsletter: true,
        }
        const result = ContactSchema.safeParse(data)
        expect(result.success).toBe(true)
    })

    it('requires name, email, and message', () => {
        const result = ContactSchema.safeParse({ name: 'Test', email: 'test@ex.com' })
        expect(result.success).toBe(false)
    })

    it('rejects invalid email', () => {
        const result = ContactSchema.safeParse({
            name: 'Test',
            email: 'bad',
            message: 'Hello',
        })
        expect(result.success).toBe(false)
    })
})

describe('BlogPostSchema', () => {
    it('validates a complete blog post', () => {
        const data = {
            slug: 'test-article',
            titleFr: 'Titre FR',
            titleEn: 'Title EN',
            summaryFr: 'Résumé FR',
            summaryEn: 'Summary EN',
            contentFr: '<p>Contenu</p>',
            contentEn: '<p>Content</p>',
            category: 'IA',
            published: true,
        }
        const result = BlogPostSchema.safeParse(data)
        expect(result.success).toBe(true)
    })

    it('requires all bilingual fields', () => {
        const data = {
            slug: 'test',
            titleFr: 'Titre',
            // missing titleEn
            summaryFr: 'R',
            summaryEn: 'S',
            contentFr: 'C',
            contentEn: 'C',
        }
        const result = BlogPostSchema.safeParse(data)
        expect(result.success).toBe(false)
    })
})

describe('BrandSettingsSchema', () => {
    it('validates complete brand settings', () => {
        const data = {
            primaryColor: '#0F2A44',
            secondaryColor: '#D4AF37',
            accentColor: '#F5A21D',
            fontFamily: 'Inter',
        }
        const result = BrandSettingsSchema.safeParse(data)
        expect(result.success).toBe(true)
    })

    it('validates hex color format', () => {
        const data = {
            primaryColor: 'not-a-color',
            secondaryColor: '#D4AF37',
            accentColor: '#F5A21D',
            fontFamily: 'Inter',
        }
        const result = BrandSettingsSchema.safeParse(data)
        expect(result.success).toBe(false)
    })
})
