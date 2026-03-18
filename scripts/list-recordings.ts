import { prisma } from '../lib/db'

async function main() {
  const recordings = await prisma.recording.findMany({
    select: { id: true, title: true, url: true }
  })

  console.log(`Total recordings remaining: ${recordings.length}`)
  if (recordings.length > 0) {
    console.log(recordings)
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
