import { Role } from '@prisma/client';

/**
 * Auth Security Module
 * 
 * IMPORTANT: This module currently uses a MOCK session for development.
 * Before going to production, replace with a real auth solution:
 * - NextAuth.js v5 (recommended for Next.js)
 * - iron-session
 * - Custom JWT with cookies
 */

interface SessionUser {
    id: string;
    email: string;
    role: Role;
}

// Mock session for development — NEVER deploy this to production
const MOCK_SESSION: SessionUser = {
    id: "cm6daaaaaaaaaaaaaa",
    email: "admin@krinch.com",
    role: Role.ADMIN,
};

/**
 * Get the current authenticated user from the session.
 * Returns null if no session exists.
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
    // TODO [PROD]: Replace with real session retrieval
    // Example with NextAuth: const session = await auth();
    // Example with iron-session: const session = await getIronSession(cookies(), sessionOptions);
    if (process.env.NODE_ENV === 'production') {
        console.warn('[SECURITY] Mock auth is active in production! This is a critical security issue.');
    }
    return MOCK_SESSION;
}

export async function requireAdmin(): Promise<SessionUser> {
    const user = await getCurrentUser();
    if (!user || user.role !== Role.ADMIN) {
        throw new Error("Accès refusé : Droits d'administrateur requis.");
    }
    return user;
}

export async function requireEditor(): Promise<SessionUser> {
    const user = await getCurrentUser();
    if (!user || (user.role !== Role.ADMIN && user.role !== Role.EDITOR)) {
        throw new Error("Accès refusé : Droits d'édition requis.");
    }
    return user;
}
