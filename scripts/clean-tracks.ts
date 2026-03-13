import 'dotenv/config';
import { prisma } from '../lib/db';

async function clean() {
    console.log("Starting DB cleanup for tracks...");

    const validSlugs = [
        'full-stack-development',
        'ai-ml',
        'cybersecurity',
        'data-engineering',
        'devops-cloud',
        'mobile-development',
        'iot-embedded',
        'data-science'
    ];

    try {
        const removed = await prisma.track.deleteMany({
            where: {
                slug: { notIn: validSlugs }
            }
        });

        console.log(`Removed ${removed.count} redundant tracks.`);
    } catch (e) {
        console.error("Error cleaning tracks:", e);
    } finally {
        await prisma.$disconnect();
    }
}

clean().catch(console.error);
