import 'dotenv/config';
import { prisma } from "../lib/db";

async function main() {
    const publicDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com', 'icloud.com'];

    try {
        const users = await prisma.user.findMany({
            where: {
                OR: publicDomains.map(domain => ({
                    email: { contains: `@${domain}` } // Simple check
                }))
            },
            select: { id: true, name: true, email: true, role: true }
        });

        if (users.length > 0) {
            console.log(`Found ${users.length} users with public domains:`);
            users.forEach(u => console.log(`- [${u.role}] ${u.name} (${u.email})`));
        } else {
            console.log("No users found with common public domains.");
        }

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
