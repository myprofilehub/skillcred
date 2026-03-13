import { prisma } from "../lib/db";

async function main() {
    const user = await prisma.user.findUnique({ where: { email: "mgmags25@gmail.com" } });
    if (!user) return console.log("No user found");
    const student = await prisma.student.findUnique({ where: { userId: user.id } });
    if (!student) return console.log("No student found");

    const enrollments = await prisma.enrollment.findMany({ where: { studentId: student.id } });
    console.log("Enrollments:", enrollments);

    for (const e of enrollments) {
        if (e.trackId) {
            const track = await prisma.track.findUnique({ where: { id: e.trackId } });
            console.log("- Track:", track?.title);
        }
        if (e.batchId) {
            const batch = await prisma.batch.findUnique({ where: { id: e.batchId } });
            console.log("- Batch:", batch?.name);
            if (batch?.projectId) {
                const project = await prisma.projectCatalogItem.findUnique({ where: { id: batch.projectId } });
                console.log("  - Project:", project?.name);
            }
        }
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
