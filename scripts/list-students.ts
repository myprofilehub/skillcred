import 'dotenv/config';
import { prisma } from "../lib/db";

async function main() {
    try {
        const students = await prisma.user.findMany({
            where: { role: "STUDENT" },
            include: { studentProfile: true }
        });

        console.log(`\nFound ${students.length} students:`);
        console.log("------------------------------------------------");
        students.forEach(s => {
            console.log(`- Name: ${s.name}`);
            console.log(`  Email: ${s.email}`);
            console.log(`  ID: ${s.id}`);
            console.log(`  Profile Created: ${s.studentProfile ? 'Yes' : 'No'}`);
            if (s.studentProfile) {
                console.log(`  Student ID: ${s.studentProfile.id}`);
                console.log(`  PAT Eligible: ${s.studentProfile.patEligible}`);
            }
            console.log("------------------------------------------------");
        });
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
