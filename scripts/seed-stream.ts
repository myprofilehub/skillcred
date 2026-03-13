import "dotenv/config";
import { prisma } from "@/lib/db";

async function main() {
    console.log("Seeding test stream enollment...");
    const email = "testscript@example.com"; // Using the user we created earlier

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            console.error("Test user not found, please run signup script first.");
            return;
        }

        // 1. Create a Track if not exists
        let track = await prisma.track.findFirst({ where: { slug: "full-stack-dev" } });
        if (!track) {
            track = await prisma.track.create({
                data: {
                    title: "Full Stack Development",
                    slug: "full-stack-dev",
                    description: "Master the art of full stack web development",
                    icon: "Layers" // Lucide icon name
                }
            });
            console.log("Created track:", track.title);
        }

        const dbUser = await prisma.user.findUnique({
            where: { email },
            include: { studentProfile: true }
        });

        if (dbUser && dbUser.studentProfile) {
            // 2. Enroll user
            const enrollment = await prisma.enrollment.findFirst({
                where: { studentId: dbUser.studentProfile.id, trackId: track.id }
            });

            if (!enrollment) {
                await prisma.enrollment.create({
                    data: {
                        studentId: dbUser.studentProfile.id,
                        trackId: track.id,
                        status: "ACTIVE",
                        progress: 10
                    }
                });
                console.log("Enrolled user in track!");
            } else {
                console.log("User already enrolled.");
            }
        } else {
            console.log("User found but no student profile.");
        }

    } catch (error) {
        console.error("Script Error:", error);
    }
}

main();
