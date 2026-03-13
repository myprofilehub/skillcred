import "dotenv/config";
import { prisma } from "../lib/db";
import bcrypt from "bcryptjs";

async function main() {
    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL is not defined");
    }

    const email = "admin@skillcred.com";
    const password = "admin@123";
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
        console.log("Admin user already exists. Updating role to ADMIN...");
        await prisma.user.update({
            where: { email },
            data: { role: "ADMIN", password: hashedPassword }
        });
        console.log("Admin user updated.");
    } else {
        await prisma.user.create({
            data: {
                name: "Admin",
                email,
                password: hashedPassword,
                role: "ADMIN",
            }
        });
        console.log("Admin user created successfully!");
    }

    console.log(`\nLogin credentials:`);
    console.log(`  Email:    ${email}`);
    console.log(`  Password: ${password}`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
