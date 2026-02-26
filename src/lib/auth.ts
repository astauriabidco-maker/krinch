import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { Role } from "@prisma/client"

declare module "next-auth" {
    interface User {
        role: Role
    }
    interface Session {
        user: {
            id: string
            email: string
            name?: string | null
            role: Role
        }
    }
}

/**
 * Auth configuration.
 * 
 * The `authorize` function uses dynamic import of db to avoid
 * importing Node.js APIs at the module level (which would break
 * Edge Runtime middleware).
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Mot de passe", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                const email = credentials.email as string
                const password = credentials.password as string

                // Dynamic import to avoid bundling db in Edge Runtime
                const { db } = await import("@/lib/db")
                const bcrypt = await import("bcryptjs")

                const user = await db.user.findUnique({
                    where: { email },
                })

                if (!user || !user.password) {
                    return null
                }

                const isValid = await bcrypt.compare(password, user.password)

                if (!isValid) {
                    return null
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role
                token.id = user.id!
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as Role
                session.user.id = token.id as string
            }
            return session
        },
        async authorized({ auth, request }) {
            const isAdmin = request.nextUrl.pathname.startsWith("/admin")
            const isLoginPage = request.nextUrl.pathname === "/login"
            const isLoggedIn = !!auth?.user

            if (isAdmin) {
                if (!isLoggedIn) return false
                return true
            }

            if (isLoginPage && isLoggedIn) {
                return Response.redirect(new URL("/admin", request.nextUrl))
            }

            return true
        },
    },
})
