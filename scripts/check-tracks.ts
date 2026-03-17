import { prisma } from './lib/db';

async function main() {
  const count = await prisma.track.count();
  console.log("Track count:", count);
}

main().finally(() => prisma.$disconnect());
