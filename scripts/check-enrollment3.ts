import { config } from "dotenv";
config(); // Load .env
import { prisma } from "../lib/db";

async function main() {
    try {
        const user = await prisma.user.findUnique({ where: { email: "mgmags25@gmail.com" } });
        if (!user) { console.log("No user"); return; }

        const student = await prisma.student.findUnique({ where: { userId: user.id } });
        if (!student) { console.log("No student"); return; }

        const enrollments = await prisma.enrollment.findMany({ where: { studentId: student.id } });
        if (enrollments.length === 0) { console.log("No enrollments for this user."); }

        for (const e of enrollments) {
            console.log("\nEnrollment:");
            console.log("Status:", e.status);
            if (e.trackId) {
                const track = await prisma.track.findUnique({ where: { id: e.trackId } });
                console.log("Track:", track?.title || "Not found");
            }
            if (e.batchId) {
                const batch = await prisma.batch.findUnique({ where: { id: e.batchId } });
                console.log("Batch:", batch?.name || "Not found");
                if (batch?.projectId) {
                    const project = await prisma.projectCatalogItem.findUnique({ where: { id: batch.projectId } });
                    console.log("Project:", project?.name || "Not found");
                }
            } else {
                console.log("Batch: None");
            }
        }
    } catch (e: any) {
        console.error("ERROR MESSAGE:", e.message);
    }
}

main().finally(() => prisma.$disconnect());
