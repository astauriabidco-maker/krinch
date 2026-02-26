import { describe, it, expect } from 'vitest'
import { sanitizeHtml, sanitizeCssValue } from '@/lib/sanitize'

describe('sanitizeHtml', () => {
    it('allows safe HTML tags', () => {
        const input = '<h2>Title</h2><p>Text with <strong>bold</strong> and <em>italic</em></p>'
        const result = sanitizeHtml(input)
        expect(result).toContain('<h2>')
        expect(result).toContain('<strong>')
        expect(result).toContain('<em>')
    })

    it('allows links with href', () => {
        const input = '<a href="https://example.com">Link</a>'
        const result = sanitizeHtml(input)
        expect(result).toContain('href="https://example.com"')
    })

    it('allows lists', () => {
        const input = '<ul><li>Item 1</li><li>Item 2</li></ul>'
        const result = sanitizeHtml(input)
        expect(result).toContain('<ul>')
        expect(result).toContain('<li>')
    })

    it('allows blockquotes', () => {
        const input = '<blockquote><p>Quote text</p></blockquote>'
        const result = sanitizeHtml(input)
        expect(result).toContain('<blockquote>')
    })

    it('allows images with src and alt', () => {
        const input = '<img src="/images/photo.jpg" alt="Photo">'
        const result = sanitizeHtml(input)
        expect(result).toContain('src="/images/photo.jpg"')
        expect(result).toContain('alt="Photo"')
    })

    it('strips script tags (XSS prevention)', () => {
        const input = '<p>Safe</p><script>alert("xss")</script>'
        const result = sanitizeHtml(input)
        expect(result).not.toContain('<script>')
        expect(result).not.toContain('alert')
        expect(result).toContain('<p>Safe</p>')
    })

    it('strips event handlers (XSS prevention)', () => {
        const input = '<img src="x" onerror="alert(1)">'
        const result = sanitizeHtml(input)
        expect(result).not.toContain('onerror')
        expect(result).not.toContain('alert')
    })

    it('strips javascript: URLs (XSS prevention)', () => {
        const input = '<a href="javascript:alert(1)">Click</a>'
        const result = sanitizeHtml(input)
        expect(result).not.toContain('javascript:')
    })

    it('strips iframe tags', () => {
        const input = '<iframe src="https://evil.com"></iframe>'
        const result = sanitizeHtml(input)
        expect(result).not.toContain('<iframe')
    })

    it('strips style attributes', () => {
        const input = '<p style="background:url(javascript:alert(1))">text</p>'
        const result = sanitizeHtml(input)
        expect(result).not.toContain('style=')
    })

    it('handles empty string', () => {
        expect(sanitizeHtml('')).toBe('')
    })

    it('allows class attributes', () => {
        const input = '<div class="prose text-lg">Content</div>'
        const result = sanitizeHtml(input)
        expect(result).toContain('class="prose text-lg"')
    })
})

describe('sanitizeCssValue', () => {
    it('accepts valid hex colors', () => {
        expect(sanitizeCssValue('#0F2A44')).toBe('#0F2A44')
        expect(sanitizeCssValue('#fff')).toBe('#fff')
        expect(sanitizeCssValue('#D4AF37')).toBe('#D4AF37')
    })

    it('rejects invalid hex colors', () => {
        expect(sanitizeCssValue('#xyz')).toBe('')
        expect(sanitizeCssValue('#00000g')).toBe('')
    })

    it('accepts rgb/rgba values', () => {
        expect(sanitizeCssValue('rgb(15, 42, 68)')).toBe('rgb(15, 42, 68)')
        expect(sanitizeCssValue('rgba(15, 42, 68, 0.5)')).toBe('rgba(15, 42, 68, 0.5)')
    })

    it('accepts named colors', () => {
        expect(sanitizeCssValue('transparent')).toBe('transparent')
        expect(sanitizeCssValue('white')).toBe('white')
    })

    it('accepts font family names', () => {
        expect(sanitizeCssValue('Inter')).toBe('Inter')
        expect(sanitizeCssValue("'Playfair Display', sans-serif")).toBe("'Playfair Display', sans-serif")
    })

    it('rejects CSS injection attempts', () => {
        expect(sanitizeCssValue('expression(alert(1))')).toBe('')
        expect(sanitizeCssValue('url(javascript:alert(1))')).toBe('')
        expect(sanitizeCssValue('; background: red')).toBe('')
    })

    it('rejects HTML in CSS values', () => {
        expect(sanitizeCssValue('</style><script>alert(1)</script>')).toBe('')
    })
})
