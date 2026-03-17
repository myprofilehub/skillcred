import 'dotenv/config';
import { prisma } from '../lib/db';

async function main() {
    const tracks = await prisma.track.findMany({
        include: {
            catalogProjects: {
                select: { name: true, difficulty: true },
                orderBy: { difficulty: 'asc' }
            }
        },
        orderBy: { title: 'asc' }
    });

    for (const t of tracks) {
        console.log(`\n=== ${t.title} (${t.slug}) === ${t.catalogProjects.length} projects`);
        for (const p of t.catalogProjects) {
            console.log(`  [diff=${p.difficulty}] ${p.name}`);
        }
    }
    
    const total = tracks.reduce((sum, t) => sum + t.catalogProjects.length, 0);
    console.log(`\n--- Total: ${total} projects ---`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
