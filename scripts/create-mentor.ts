import 'dotenv/config';
import { prisma } from '../lib/db';
import { UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

async function main() {
    const email = 'admin@codequestzone.com';
    const password = await bcrypt.hash('mentor123', 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            name: 'Dr. Sarah Miller',
            password,
            role: UserRole.MENTOR,
            mentorProfile: {
                create: {
                    specialization: "Full Stack Development",
                    bio: "Senior Lecturer with 10 years of industry experience.",
                    availability: "Mon-Fri 10am-4pm"
                }
            }
        },
    });

    console.log({ user });
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
