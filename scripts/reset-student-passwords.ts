import 'dotenv/config';
import { prisma } from '../lib/db';
import bcrypt from 'bcryptjs';

async function main() {
    const newPassword = 'Password123';
    const hashed = await bcrypt.hash(newPassword, 10);

    const result = await prisma.user.updateMany({
        where: {
            role: 'STUDENT',
            email: { in: ['mgmags25@gmail.com', 'mentor1@codequestzone.com'] }
        },
        data: { password: hashed }
    });

    console.log(`Updated ${result.count} student account(s) with password: ${newPassword}`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
