import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the rate limit module's in-memory store behavior
describe('Rate Limiting (in-memory)', () => {
    const createLimiter = (max: number, windowMs: number) => {
        const store = new Map<string, { count: number; resetAt: number }>()

        return {
            async limit(identifier: string) {
                const now = Date.now()
                const existing = store.get(identifier)

                if (!existing || now > existing.resetAt) {
                    store.set(identifier, { count: 1, resetAt: now + windowMs })
                    return { success: true, remaining: max - 1 }
                }

                if (existing.count >= max) {
                    return { success: false, remaining: 0 }
                }

                existing.count += 1
                return { success: true, remaining: max - existing.count }
            },
            _store: store,
        }
    }

    it('allows requests within the limit', async () => {
        const limiter = createLimiter(3, 60_000)

        const r1 = await limiter.limit('user1')
        const r2 = await limiter.limit('user1')
        const r3 = await limiter.limit('user1')

        expect(r1.success).toBe(true)
        expect(r2.success).toBe(true)
        expect(r3.success).toBe(true)
    })

    it('blocks requests exceeding the limit', async () => {
        const limiter = createLimiter(2, 60_000)

        await limiter.limit('user1')
        await limiter.limit('user1')
        const r3 = await limiter.limit('user1')

        expect(r3.success).toBe(false)
        expect(r3.remaining).toBe(0)
    })

    it('tracks different users independently', async () => {
        const limiter = createLimiter(1, 60_000)

        const r1 = await limiter.limit('user1')
        const r2 = await limiter.limit('user2')

        expect(r1.success).toBe(true)
        expect(r2.success).toBe(true)

        // user1 is now rate limited
        const r3 = await limiter.limit('user1')
        expect(r3.success).toBe(false)

        // user2 is also limited (1 request max)
        const r4 = await limiter.limit('user2')
        expect(r4.success).toBe(false)
    })

    it('reports remaining quota correctly', async () => {
        const limiter = createLimiter(5, 60_000)

        const r1 = await limiter.limit('user1')
        expect(r1.remaining).toBe(4)

        const r2 = await limiter.limit('user1')
        expect(r2.remaining).toBe(3)
    })

    it('resets after window expires', async () => {
        const limiter = createLimiter(1, 100) // 100ms window

        const r1 = await limiter.limit('user1')
        expect(r1.success).toBe(true)

        const r2 = await limiter.limit('user1')
        expect(r2.success).toBe(false)

        // Wait for window to expire
        await new Promise(resolve => setTimeout(resolve, 150))

        const r3 = await limiter.limit('user1')
        expect(r3.success).toBe(true)
    })
})
