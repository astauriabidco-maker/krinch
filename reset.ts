import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'dev.db');
const url = `file:${dbPath}`;
process.env.DATABASE_URL = url;
const adapter = new PrismaLibSql({ url });
const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.brandSettings.upsert({
        where: { id: 'default' },
        update: {
            primaryColor: '#0F2A44',
            secondaryColor: '#D4AF37',
            accentColor: '#F5A21D',
            fontFamily: 'Inter',
        },
        create: {
            id: 'default',
            primaryColor: '#0F2A44',
            secondaryColor: '#D4AF37',
            accentColor: '#F5A21D',
            fontFamily: 'Inter',
        }
    });
    console.info('Brand settings reset complete');
}

main().finally(() => prisma.$disconnect());
