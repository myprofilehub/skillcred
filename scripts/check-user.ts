
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const email = 'mgmags25@gmail.com'
    console.log(`Checking user: ${email}`)

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        console.log('User not found')
    } else {
        console.log('User found:', {
            id: user.id,
            name: user.name,
            email: user.email,
            // @ts-ignore
            lmsEmail: user.lmsEmail,
            // @ts-ignore
            forcePasswordChange: user.forcePasswordChange,
            hasPassword: !!user.password,
            passwordHash: user.password ? user.password.substring(0, 10) + '...' : null
        })
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
