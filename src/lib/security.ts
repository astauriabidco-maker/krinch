import { Role } from '@prisma/client';
import { auth } from '@/lib/auth';

/**
 * Auth Security Module
 * 
 * Uses NextAuth.js v5 for session management.
 * The `auth()` function reads the JWT from the cookie and returns the session.
 */

interface SessionUser {
    id: string;
    email: string;
    role: Role;
}

/**
 * Get the current authenticated user from the session.
 * Returns null if no session exists.
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
    const session = await auth();

    if (!session?.user) {
        return null;
    }

    return {
        id: session.user.id,
        email: session.user.email!,
        role: session.user.role,
    };
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
