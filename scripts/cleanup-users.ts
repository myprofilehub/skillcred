
import 'dotenv/config';
import { prisma } from '../lib/db';

async function main() {
    const emailsToDelete = ['mentor@skillcred.com', 'mentor1@codequestzone.com'];

    const result = await prisma.user.deleteMany({
        where: {
            email: {
                in: emailsToDelete
            }
        }
    });

    console.log(`Deleted ${result.count} users.`);
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
