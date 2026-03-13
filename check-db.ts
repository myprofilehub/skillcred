import "dotenv/config";
import { prisma } from "@/lib/db";

async function main() {
    try {
        const users = await prisma.user.findMany();
        console.log("Users in DB:", users);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

main();
