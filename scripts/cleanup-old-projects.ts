import 'dotenv/config';
import { prisma } from '../lib/db';
import { projectsData } from './reworked-projects-data';

async function main() {
    console.log('🧹 Cleaning up old projects not from SkillCred Projects document...\n');

    // Collect all valid project names from the reworked data
    const validNames = new Set<string>();
    for (const projects of Object.values(projectsData)) {
        for (const p of projects as any[]) {
            validNames.add(p.name);
        }
    }
    console.log(`✅ Valid projects from document: ${validNames.size}`);

    // Get all projects in DB
    const allProjects = await prisma.projectCatalogItem.findMany({
        select: { id: true, name: true }
    });
    console.log(`📊 Total projects in DB: ${allProjects.length}`);

    // Find projects NOT in the document
    const toDelete = allProjects.filter(p => !validNames.has(p.name));
    console.log(`🗑️  Projects to delete: ${toDelete.length}`);
    
    for (const p of toDelete) {
        console.log(`  ❌ Deleting: ${p.name}`);
    }

    // Check if any have batch relations
    for (const p of toDelete) {
        const batchCount = await prisma.batch.count({ where: { projectId: p.id } });
        if (batchCount > 0) {
            console.log(`  ⚠️  ${p.name} has ${batchCount} batches, deleting batches first...`);
            await prisma.batch.deleteMany({ where: { projectId: p.id } });
        }
        await prisma.projectCatalogItem.delete({ where: { id: p.id } });
    }

    const remaining = await prisma.projectCatalogItem.count();
    console.log(`\n✨ Done! Remaining projects: ${remaining}`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
