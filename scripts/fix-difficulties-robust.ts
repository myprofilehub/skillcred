import "dotenv/config";
import { prisma } from "../lib/db";

async function fixDifficulties() {
    const tracks = await prisma.track.findMany({
        include: {
            catalogProjects: {
                orderBy: [
                    { difficulty: 'asc' },
                    { createdAt: 'asc' }
                ]
            }
        }
    });

    for (const track of tracks) {
        if (track.catalogProjects.length !== 6) {
            console.log(`Track ${track.title} has ${track.catalogProjects.length} projects. Skipping pattern enforcement.`);
            continue;
        }

        const projects = track.catalogProjects;
        for (let i = 0; i < projects.length; i++) {
            let diff = 3;
            if (i === 2) diff = 4;
            if (i >= 3) diff = 5;

            if (projects[i].difficulty !== diff) {
                await prisma.projectCatalogItem.update({
                    where: { id: projects[i].id },
                    data: { difficulty: diff }
                });
                console.log(`Updated ${projects[i].name} to difficulty ${diff}`);
            }
        }
    }
    console.log("Difficulty enforcement complete.");
}

fixDifficulties().catch(console.error).finally(() => prisma.$disconnect());
