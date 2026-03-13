import 'dotenv/config';
import { prisma } from '../lib/db';
import { projectsData } from './reworked-projects-data';

const streams = [
    { slug: 'full-stack-development', title: 'Full Stack Development' },
    { slug: 'ai-ml', title: 'AI & Machine Learning' },
    { slug: 'cybersecurity', title: 'Cybersecurity' },
    { slug: 'data-engineering', title: 'Data Engineering' },
    { slug: 'devops-cloud', title: 'DevOps & Cloud' },
    { slug: 'mobile-development', title: 'Mobile Development' },
    { slug: 'iot-embedded', title: 'IoT & Embedded' },
    { slug: 'data-science', title: 'Data Science & Analytics' },
];

async function main() {
    console.log('🌱 Seeding Reworked Project Catalog...');

    // 1. Clear existing projects created by SYSTEM
    console.log('🗑️ Disabling existing system catalog items...');
    await prisma.projectCatalogItem.updateMany({
        where: { addedBy: 'SYSTEM' },
        data: { isActive: false }
    });

    // 2. Ensure Tracks Exist and Seed Projects
    for (const stream of streams) {
        const track = await prisma.track.upsert({
            where: { slug: stream.slug },
            update: { title: stream.title },
            create: {
                slug: stream.slug,
                title: stream.title,
                description: `Master ${stream.title} through real-world projects.`,
            }
        });
        console.log(`\n✅ Track verified: ${track.title}`);

        const projects = projectsData[stream.slug] || [];
        for (const project of projects) {
            await prisma.projectCatalogItem.create({
                data: {
                    trackId: track.id,
                    name: project.name,
                    tagline: project.tagline || project.name,
                    description: (project.description || project.name).substring(0, 1000),
                    difficulty: project.difficulty || 3,
                    coreFeatures: project.coreFeatures || [],
                    conceptsCovered: project.conceptsCovered || {},
                    startupAngle: (project.startupAngle || '').substring(0, 500),
                    isActive: true,
                    addedBy: 'SYSTEM'
                }
            });
            console.log(`   ➕ Added ${project.name}`);
        }
    }

    console.log('✨ Reworked Seeding complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
