import 'dotenv/config';
import { prisma } from '../lib/db';

async function main() {
    const email = 'admin@codequestzone.com';
    const user = await prisma.user.update({
        where: { email },
        data: { emailVerified: new Date() },
        select: { id: true, email: true, role: true, emailVerified: true }
    });
    console.log('Mentor User Verified:', user);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
