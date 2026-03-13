import "dotenv/config";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

async function main() {
    console.log("Testing login logic directly...");
    const email = "testscript@example.com";
    const password = "password123";

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            console.log("User not found via findUnique");
            return;
        }
        console.log("User found:", user.email);

        if (!user.password) {
            console.log("User has no password");
            return;
        }

        const match = await bcrypt.compare(password, user.password);
        console.log("Password match result:", match);
    } catch (error) {
        console.error("Script Error:", error);
    }
}

main();
