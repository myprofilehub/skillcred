
import 'dotenv/config';
import { prisma } from '../lib/db';

async function main() {
    console.log("--- USERS ---");
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            role: true,
            accounts: {
                select: {
                    provider: true,
                    providerAccountId: true,
                    refresh_token: true // Check if this exists!
                }
            }
        }
    });
    console.log(JSON.stringify(users, null, 2));

    console.log("\n--- ACCOUNTS ---");
    // Accounts are already shown nested above, but let's count them or show orphans if any
    const accounts = await prisma.account.findMany({
        select: { userId: true, provider: true, providerAccountId: true }
    });
    console.log("Total Accounts:", accounts.length);
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
