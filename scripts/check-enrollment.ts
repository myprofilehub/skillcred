import { prisma } from "../lib/db";

async function main() {
    const user = await prisma.user.findUnique({
        where: { email: "mgmags25@gmail.com" },
        include: {
            studentProfile: {
                include: {
                    enrollments: {
                        include: {
                            track: true,
                            batch: {
                                include: { project: true }
                            }
                        }
                    }
                }
            }
        }
    });

    console.log(JSON.stringify(user?.studentProfile?.enrollments, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
