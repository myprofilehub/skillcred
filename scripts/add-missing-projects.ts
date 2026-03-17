import 'dotenv/config';
import { prisma } from '../lib/db';
import { projectsData } from './reworked-projects-data';

// Map from reworked-projects-data slugs to actual DB track slugs
const slugMap: Record<string, string> = {
    'full-stack-development': 'full-stack',
    'ai-ml': 'ai-ml',
    'cybersecurity': 'cybersecurity',
    'data-engineering': 'data-engineering',
    'devops-cloud': 'devops-cloud',
    'mobile-development': 'mobile-development',
    'iot-embedded': 'iot-embedded',
    'data-science': 'data-science',
};

async function main() {
    console.log('🔍 Checking for missing projects...\n');

    // First, list all tracks and their slugs for debugging
    const allTracks = await prisma.track.findMany({ select: { id: true, slug: true, title: true } });
    console.log('DB Tracks:');
    for (const t of allTracks) {
        console.log(`  ${t.title} => slug: "${t.slug}"`);
    }
    console.log('');

    let totalAdded = 0;
    let totalSkipped = 0;

    for (const [dataSlug, projects] of Object.entries(projectsData)) {
        // Try mapped slug first, then fall back to the original
        const dbSlug = slugMap[dataSlug] || dataSlug;
        
        const track = await prisma.track.findUnique({ where: { slug: dbSlug } });
        if (!track) {
            // Try fallback: find track by partial match
            const fallback = allTracks.find(t => 
                t.slug.includes(dataSlug.split('-')[0]) || dataSlug.includes(t.slug)
            );
            if (fallback) {
                console.log(`⚠️  Slug "${dbSlug}" not found, using fallback: "${fallback.slug}" (${fallback.title})`);
                const fbTrack = fallback;
                await seedProjects(fbTrack.id, fbTrack.title, projects);
            } else {
                console.log(`❌ Track not found for slug: "${dbSlug}" (data slug: "${dataSlug}"). Skipping.`);
            }
            continue;
        }

        const result = await seedProjects(track.id, track.title, projects);
        totalAdded += result.added;
        totalSkipped += result.skipped;
    }

    console.log(`\n✨ Done! Added: ${totalAdded}, Skipped (already exist): ${totalSkipped}`);
    
    // Final count
    const finalCount = await prisma.projectCatalogItem.count();
    console.log(`📊 Total projects in DB: ${finalCount}`);
}

async function seedProjects(trackId: string, trackTitle: string, projects: any[]) {
    let added = 0;
    let skipped = 0;
    
    console.log(`\n📁 ${trackTitle}:`);
    
    for (const project of projects) {
        const existing = await prisma.projectCatalogItem.findFirst({
            where: {
                trackId,
                name: project.name
            }
        });

        if (existing) {
            console.log(`  🔹 Already exists: ${project.name}`);
            skipped++;
        } else {
            await prisma.projectCatalogItem.create({
                data: {
                    trackId,
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
            console.log(`  ➕ Added: ${project.name}`);
            added++;
        }
    }
    
    return { added, skipped };
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
