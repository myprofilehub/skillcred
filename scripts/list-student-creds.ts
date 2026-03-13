import 'dotenv/config';
import { prisma } from '../lib/db';

async function main() {
    const students = await prisma.user.findMany({
        where: { role: 'STUDENT' },
        select: { name: true, email: true, username: true, role: true },
        take: 20,
        orderBy: { createdAt: 'desc' }
    });

    console.log('\n=== Student Users ===\n');
    if (students.length === 0) {
        console.log('No student users found in the database.');
    } else {
        students.forEach((s, i) => {
            console.log(`${i + 1}. ${s.name || 'N/A'}`);
            console.log(`   Email:    ${s.email}`);
            console.log(`   Username: ${s.username || 'N/A'}`);
            console.log(`   Role:     ${s.role}`);
            console.log('');
        });
    }
    console.log(`Total: ${students.length} student(s)`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
