import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
    const tursoUrl = process.env.TURSO_DATABASE_URL
    const tursoToken = process.env.TURSO_AUTH_TOKEN

    let url: string
    let authToken: string | undefined

    if (tursoUrl && tursoToken) {
        // Production: use Turso hosted LibSQL
        url = tursoUrl
        authToken = tursoToken
    } else {
        // Development: use DATABASE_URL from .env
        url = process.env.DATABASE_URL || 'file:./dev.db'
        authToken = undefined
    }

    const adapter = new PrismaLibSql({ url, authToken })

    return new PrismaClient({ adapter })
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = db
}
