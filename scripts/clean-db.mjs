import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('--- DB CLEANUP INITIATED ---');

    console.log('[1/3] Deleting Accounts & Sessions...');
    await prisma.account.deleteMany({});
    await prisma.session.deleteMany({});
    
    console.log('[2/3] Deleting Verification Tokens...');
    await prisma.verificationToken.deleteMany({});
    
    console.log('[3/3] Deleting Users (Cascades to Profiles, Enrollments)...');
    const result = await prisma.user.deleteMany({});
    
    console.log(`--- DB CLEANUP COMPLETE ---`);
    console.log(`Deleted ${result.count} User records.`);
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error("Cleanup failed:", e)
        await prisma.$disconnect()
        process.exit(1)
    });
