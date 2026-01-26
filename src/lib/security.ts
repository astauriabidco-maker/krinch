import { Role } from '@prisma/client';
import { db } from './db';

// Simulation de session pour le développement (à remplacer par NextAuth/IronSession)
const MOCK_SESSION_USER_ID = "cm6daaaaaaaaaaaaaa"; // ID fictif

export async function getCurrentUser() {
    // TODO: Récupérer la vraie session via cookies/headers
    // const session = await getSession();
    // if (!session) return null;

    // Pour le dev, on retourne un mock si on ne trouve rien
    return {
        id: MOCK_SESSION_USER_ID,
        email: "admin@krinch.com",
        role: Role.ADMIN
    };
}

export async function requireAdmin() {
    const user = await getCurrentUser();
    if (!user || user.role !== Role.ADMIN) {
        throw new Error("Accès refusé : Droits d'administrateur requis.");
    }
    return user;
}

export async function requireEditor() {
    const user = await getCurrentUser();
    if (!user || (user.role !== Role.ADMIN && user.role !== Role.EDITOR)) {
        throw new Error("Accès refusé : Droits d'édition requis.");
    }
    return user;
}
