import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'
import { subDays } from 'date-fns'
import path from 'path'

const dbPath = path.resolve(process.cwd(), 'prisma', 'dev.db')
const url = `file:${dbPath}`
const libsqlClient = createClient({ url })
const adapter = new PrismaLibSql(libsqlClient)
const prisma = new PrismaClient({
    adapter,
    datasources: {
        db: {
            url: "file:./prisma/dev.db"
        }
    }
})

async function main() {
    console.log('🌱 Starting seeding...')

    // 1. Clean Database
    await prisma.quizResult.deleteMany()
    await prisma.lead.deleteMany()
    await prisma.blogPost.deleteMany()
    await prisma.teamMember.deleteMany()

    // 2. Leads (Realistic Data)
    const leadsData = [
        {
            name: "Jean Dupont", email: "j.dupont@orange.cm", company: "Orange Cameroun",
            interest: "IA", score: 85, status: "NEW", daysAgo: 2
        },
        {
            name: "Marie Ngassa", email: "m.ngassa@mtn.cm", company: "MTN Cameroon",
            interest: "STRATEGY", score: 62, status: "CONTACTED", daysAgo: 5
        },
        {
            name: "Paul Biya (Homonyme)", email: "paul.b@gov.cm", company: "MINFOPRA",
            interest: "DIGITAL", score: 45, status: "new", daysAgo: 10
        },
        {
            name: "Sarah Etoundi", email: "s.etoundi@cimencam.cm", company: "Cimencam",
            interest: "HR", score: 92, status: "ARCHIVED", daysAgo: 25
        },
        {
            name: "Alain Foka", email: "a.foka@media.com", company: "Media Africa",
            interest: "STRATEGY", score: 78, status: "NEW", daysAgo: 1
        },
    ];

    for (const l of leadsData) {
        const lead = await prisma.lead.create({
            data: {
                name: l.name,
                email: l.email,
                company: l.company,
                companySize: "50-200",
                serviceInterest: l.interest,
                status: l.status as any, // Cast for simplicity
                createdAt: subDays(new Date(), l.daysAgo),
                quizResults: {
                    create: {
                        scoreValue: l.score,
                        answersJson: { "q1": "Answer A", "q2": "Answer B" }
                    }
                }
            }
        })
    }

    // 3. Blog Posts
    await prisma.blogPost.create({
        data: {
            slug: 'ia-revolution-afrique',
            titleFr: "L'IA : Une Révolution pour l'Afrique ?",
            titleEn: "AI: A Revolution for Africa?",
            summaryFr: "Analyse des opportunités de l'intelligence artificielle pour les entreprises camerounaises.",
            summaryEn: "Analysis of AI opportunities for Cameroonian companies.",
            contentFr: "<p>L'intelligence artificielle n'est plus une fiction...</p>",
            contentEn: "<p>Artificial intelligence is no longer fiction...</p>",
            category: "IA",
            published: true,
            publishedAt: subDays(new Date(), 10)
        }
    })

    await prisma.blogPost.create({
        data: {
            slug: 'transformation-digitale-2026',
            titleFr: "Transformation Digitale : Tendances 2026",
            titleEn: "Digital Transformation: 2026 Trends",
            summaryFr: "Ce qu'il faut savoir pour rester compétitif.",
            summaryEn: "What you need to know to stay competitive.",
            contentFr: "<p>Le digital évolue vite...</p>",
            contentEn: "<p>Digital is moving fast...</p>",
            category: "DIGITAL",
            published: false
        }
    })

    // 4. Team
    await prisma.teamMember.create({
        data: {
            name: "Dr. K",
            roleFr: "Associé Gérant",
            roleEn: "Managing Partner",
            bioFr: "Expert en stratégie...",
            bioEn: "Expert in strategy...",
        }
    })

    console.log('✅ Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
