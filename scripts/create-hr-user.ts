import "dotenv/config";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

async function createHRUser() {
    console.log("Creating HR test user...");

    const email = "hr@test.com";
    const password = "password123";
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            console.log("User already exists:", existingUser.email);

            // Check if HR profile exists
            const hrProfile = await prisma.hRProtocol.findUnique({
                where: { userId: existingUser.id },
            });

            if (!hrProfile) {
                // Create HR profile for existing user
                await prisma.hRProtocol.create({
                    data: {
                        userId: existingUser.id,
                        company: "Test Company Inc.",
                        position: "HR Manager",
                    },
                });
                console.log("Created HR profile for existing user");
            } else {
                console.log("HR profile already exists");
            }

            // Update role if needed
            if (existingUser.role !== "HR") {
                await prisma.user.update({
                    where: { id: existingUser.id },
                    data: { role: "HR" },
                });
                console.log("Updated user role to HR");
            }

            return;
        }

        // Create new user with HR role
        const user = await prisma.user.create({
            data: {
                email,
                name: "HR Test User",
                password: hashedPassword,
                role: "HR",
                emailVerified: new Date(),
            },
        });
        console.log("Created user:", user.email, "with ID:", user.id);

        // Create HR profile
        const hrProfile = await prisma.hRProtocol.create({
            data: {
                userId: user.id,
                company: "Test Company Inc.",
                position: "HR Manager",
            },
        });
        console.log("Created HR profile:", hrProfile.id);

        console.log("\n✅ HR user created successfully!");
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Role: HR");
    } catch (error) {
        console.error("Error creating HR user:", error);
    } finally {
        await prisma.$disconnect();
    }
}

createHRUser();
