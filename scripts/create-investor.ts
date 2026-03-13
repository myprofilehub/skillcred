import 'dotenv/config';
import { prisma } from '../lib/db';
import { UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

async function main() {
    const email = 'investor@skillcred.com';
    const password = await bcrypt.hash('investor123', 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            name: 'John Venture',
            password,
            role: UserRole.INVESTOR,
            investorProfile: {
                create: {
                    company: "SkillCred Ventures",
                    position: "Managing Partner",
                    bio: "Investing in early-stage EdTech and AI startups.",
                    focusAreas: ["AI/ML", "EdTech", "SaaS"],
                    investmentRange: "$50K - $250K",
                    portfolioUrl: "https://skillcred.com",
                    linkedinUrl: "https://linkedin.com"
                }
            }
        },
    });

    console.log("Investor created:", { email, password: "investor123" });
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
