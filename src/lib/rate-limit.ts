import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

/**
 * Rate Limiting Module
 * 
 * Uses Upstash Redis in production (when UPSTASH_REDIS_REST_URL is set).
 * Falls back to an in-memory store in development.
 */

// In-memory fallback for development
const inMemoryStore = new Map<string, { count: number; resetAt: number }>();

function getInMemoryRatelimiter(maxRequests: number, windowSeconds: number) {
    return {
        async limit(identifier: string) {
            const now = Date.now();
            const key = identifier;
            const existing = inMemoryStore.get(key);

            if (!existing || now > existing.resetAt) {
                inMemoryStore.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
                return { success: true, remaining: maxRequests - 1 };
            }

            if (existing.count >= maxRequests) {
                return { success: false, remaining: 0 };
            }

            existing.count += 1;
            return { success: true, remaining: maxRequests - existing.count };
        },
    };
}

const hasUpstash = !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

// Production: Upstash Redis | Development: In-memory
function createRatelimiter(maxRequests: number, windowSeconds: number) {
    if (hasUpstash) {
        return new Ratelimit({
            redis: Redis.fromEnv(),
            limiter: Ratelimit.slidingWindow(maxRequests, `${windowSeconds} s`),
            analytics: true,
            prefix: "krinch:ratelimit",
        });
    }
    return getInMemoryRatelimiter(maxRequests, windowSeconds);
}

/**
 * Rate limiters for different endpoints.
 * 
 * - contact: 5 submissions per 15 minutes
 * - newsletter: 3 subscriptions per 15 minutes  
 * - quiz: 10 submissions per 15 minutes
 * - login: 5 attempts per 5 minutes (strict)
 */
export const rateLimiters = {
    contact: createRatelimiter(5, 900),      // 5 per 15 min
    newsletter: createRatelimiter(3, 900),   // 3 per 15 min
    quiz: createRatelimiter(10, 900),        // 10 per 15 min
    login: createRatelimiter(5, 300),        // 5 per 5 min
};

/**
 * Get the client IP address from request headers.
 * Works with Vercel, Cloudflare, and standard proxies.
 */
export async function getClientIp(): Promise<string> {
    const headersList = await headers();
    return (
        headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        headersList.get("x-real-ip") ||
        headersList.get("cf-connecting-ip") ||
        "anonymous"
    );
}

/**
 * Check rate limit for a given action.
 * Returns { success: true } if allowed, { success: false, error } if rate limited.
 */
export async function checkRateLimit(
    limiter: typeof rateLimiters.contact,
    identifier?: string
): Promise<{ success: boolean; error?: string }> {
    const ip = identifier || await getClientIp();
    const result = await limiter.limit(ip);

    if (!result.success) {
        return {
            success: false,
            error: "Trop de requêtes. Veuillez patienter quelques minutes avant de réessayer.",
        };
    }

    return { success: true };
}
