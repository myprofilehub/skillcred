import 'dotenv/config';
import { prisma } from '../lib/db.ts';

async function main() {
    const counts = await prisma.track.count();
    console.log("Tracks in DB:", counts);
}

main().catch(console.error).finally(() => process.exit(0));
