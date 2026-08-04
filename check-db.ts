import "dotenv/config";
import { prisma } from "@/lib/db";

async function main() {
    try {
        const tracks = await prisma.track.findMany({
            include: {
                courses: {
                    select: { id: true, title: true }
                }
            }
        });
        console.log("Tracks in DB:", JSON.stringify(tracks, null, 2));
    } catch (error) {
        console.error("Error fetching tracks:", error);
    }
}

main();
