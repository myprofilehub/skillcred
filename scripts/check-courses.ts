import "dotenv/config";
import { prisma } from "@/lib/db";

async function main() {
  const tracks = await prisma.track.findMany({
    include: { courses: true }
  });
  console.log("Tracks in DB:", tracks.length);
  tracks.forEach(t => {
    console.log(`- ${t.title} (${t.slug}): ${t.courses.length} courses`);
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
