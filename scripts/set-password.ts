import 'dotenv/config' // Load .env
import { prisma } from '../lib/db' // Use shared instance
import bcrypt from 'bcryptjs'

async function main() {
    const email = 'mgmags25@gmail.com'
    const newPassword = 'SkillCred@123'
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    console.log(`Setting password for: ${email}`)

    // No need to instantiate new PrismaClient
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        console.log('User not found')
    } else {
        try {
            const result = await prisma.user.update({
                where: { id: user.id },
                data: {
                    password: hashedPassword,
                    forcePasswordChange: false,
                    // Also setting lmsEmail if missing, standardizing username
                    username: user.username || 'mgmags25',
                    lmsEmail: user.lmsEmail || `mgmags25@skillcred.com`
                }
            });
            console.log('Password updated successfully for:', result.email);
            console.log('New Password: ', newPassword);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
