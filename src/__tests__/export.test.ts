import { describe, it, expect, vi, beforeEach } from 'vitest'

/**
 * Test the CSV generation logic (extracted from downloadAsCSV).
 * We test the data transformation, not the DOM operations.
 */
function generateCsvContent(data: Record<string, unknown>[]): string {
    if (!data || !data.length) return ''

    const separator = ','
    const keys = Object.keys(data[0])

    return [
        keys.join(separator),
        ...data.map(row =>
            keys.map(key => {
                let val = row[key]
                if (typeof val === 'string') {
                    val = `"${val.replace(/"/g, '""')}"`
                }
                if (val instanceof Date) val = val.toISOString()
                if (typeof val === 'object' && val !== null) val = JSON.stringify(val).replace(/"/g, '""')
                return val ?? ''
            }).join(separator)
        )
    ].join('\n')
}

describe('CSV Generation', () => {
    it('generates proper CSV headers from keys', () => {
        const csv = generateCsvContent([
            { name: 'Jean', email: 'jean@test.com' },
        ])
        const lines = csv.split('\n')
        expect(lines[0]).toBe('name,email')
    })

    it('generates proper CSV rows', () => {
        const csv = generateCsvContent([
            { name: 'Jean', email: 'jean@test.com', score: 85 },
        ])
        const lines = csv.split('\n')
        expect(lines[1]).toBe('"Jean","jean@test.com",85')
    })

    it('escapes quotes in string values', () => {
        const csv = generateCsvContent([
            { name: 'O"Brien', note: 'Has "quotes"' },
        ])
        expect(csv).toContain('"O""Brien"')
        expect(csv).toContain('"Has ""quotes"""')
    })

    it('handles null and undefined values', () => {
        const csv = generateCsvContent([
            { name: 'Test', company: null, phone: undefined },
        ])
        const lines = csv.split('\n')
        expect(lines[1]).toContain(',,')
    })

    it('handles empty data array', () => {
        const csv = generateCsvContent([])
        expect(csv).toBe('')
    })

    it('handles multiple rows', () => {
        const csv = generateCsvContent([
            { name: 'Alice', email: 'alice@test.com' },
            { name: 'Bob', email: 'bob@test.com' },
            { name: 'Charlie', email: 'charlie@test.com' },
        ])
        const lines = csv.split('\n')
        expect(lines).toHaveLength(4) // 1 header + 3 rows
    })

    it('handles Date values', () => {
        const date = new Date('2026-01-15T10:00:00Z')
        const csv = generateCsvContent([
            { name: 'Test', createdAt: date },
        ])
        expect(csv).toContain('2026-01-15')
    })

    it('handles nested objects', () => {
        const csv = generateCsvContent([
            { name: 'Test', data: { q1: 'A', q2: 'B' } },
        ])
        expect(csv).toContain('q1')
        expect(csv).toContain('q2')
    })
})
