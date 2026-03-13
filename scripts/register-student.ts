
import "dotenv/config";
import { prisma } from "../lib/db";

async function main() {
    const email = "mentor1@codequestzone.com";
    const name = "Mentor One"; // Placeholder name

    console.log(`Checking for existing user: ${email}...`);

    const existing = await prisma.user.findUnique({
        where: { email }
    });

    if (existing) {
        console.log("User already exists:", existing.id);
        return;
    }

    console.log("Creating new student user...");
    const user = await prisma.user.create({
        data: {
            email,
            name,
            username: "mentor1",
            role: "STUDENT",
            studentProfile: {
                create: {
                    // Create empty student profile
                    stream: "Full stack development", // Defaulting for demo
                }
            }
        }
    });

    console.log(`Successfully registered ${user.name} (ID: ${user.id})`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

