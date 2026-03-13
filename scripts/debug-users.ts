import "dotenv/config";
import { prisma } from "../lib/db";

async function main() {
    console.log("Fetching all users...");
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            studentProfile: true
        }
    });

    console.log("\nUsers found:", users.length);
    console.table(users.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        hasProfile: !!u.studentProfile
    })));
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
