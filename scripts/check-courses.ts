import "dotenv/config";
import { prisma } from "@/lib/db";

async function main() {
    console.log("Checking courses in DB...");
    const courses = await prisma.course.findMany({
        include: { track: true, modules: true }
    });
    console.log(`Found ${courses.length} courses:`);
    for (const c of courses) {
        console.log(`- Course: ${c.title} (Track: ${c.track.title}) with ${c.modules.length} modules`);
    }
}
main().catch(console.error).finally(() => prisma.$disconnect());
