import { prisma } from '../lib/db';

async function main() {
    const email = 'mentor1@codequestzone.com';

    // Find user by email
    const user = await prisma.user.findUnique({
        where: { email },
        include: { studentProfile: { include: { portfolio: true } } }
    });

    if (!user) {
        console.log('User not found:', email);
        return;
    }

    console.log('User found:', user.name, 'Role:', user.role);

    if (!user.studentProfile) {
        console.log('No student profile found for this user');
        return;
    }

    if (!user.studentProfile.portfolio) {
        // Create portfolio with PAT passed
        const portfolio = await prisma.portfolio.create({
            data: {
                studentId: user.studentProfile.id,
                patPassedAt: new Date(),
                isUnlocked: true
            }
        });
        console.log('Created portfolio with PAT passed at:', portfolio.patPassedAt);
    } else {
        // Update existing portfolio
        const portfolio = await prisma.portfolio.update({
            where: { id: user.studentProfile.portfolio.id },
            data: {
                patPassedAt: new Date(),
                isUnlocked: true
            }
        });
        console.log('Updated portfolio - PAT marked as passed at:', portfolio.patPassedAt);
    }
}

main().catch(console.error);
