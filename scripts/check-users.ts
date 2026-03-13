import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const users = await prisma.user.findMany({
        select: { id: true, name: true, email: true, role: true, lmsEmail: true, password: true }
    });

    console.log(`\n=== ${users.length} Users Found ===\n`);
    console.log('Role       | Name                 | Email                          | Has Password | LMS Email');
    console.log('-'.repeat(100));

    for (const u of users) {
        const role = u.role.padEnd(10);
        const name = (u.name || 'N/A').padEnd(20);
        const email = (u.email || 'N/A').padEnd(30);
        const hasPwd = u.password ? 'YES' : 'NO';
        const lms = u.lmsEmail || '-';
        console.log(`${role} | ${name} | ${email} | ${hasPwd.padEnd(12)} | ${lms}`);
    }

    await prisma.$disconnect();
    await pool.end();
}

main().catch(e => { console.error('Error:', e.message); process.exit(1); });
