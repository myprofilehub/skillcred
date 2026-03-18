import { prisma } from '../lib/db'

async function main() {
  const tracks = await prisma.track.findMany()

  if (tracks.length === 0) {
    console.log("No tracks found, cannot seed recordings.")
    return
  }

  const recordingsData: any[] = []
  
  for (const track of tracks) {
    recordingsData.push({
      title: `Introduction to ${track.title} Masterclass`,
      description: `A comprehensive overview of ${track.title} covering the fundamental concepts, tools, and best practices.`,
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // placeholder video
      type: "PRE_RECORDED",
      trackId: track.id,
      isPublic: true,
    })
    recordingsData.push({
      title: `Advanced ${track.title} Techniques`,
      description: `Deep dive into advanced topics and industry workflows for ${track.title}.`,
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // placeholder video
      type: "PRE_RECORDED",
      trackId: track.id,
      isPublic: true,
    })
  }

  console.log(`Seeding ${recordingsData.length} recordings...`)
  
  await prisma.recording.deleteMany({
    where: { type: "PRE_RECORDED" }
  })
  
  await prisma.recording.createMany({
    data: recordingsData
  })

  console.log("Recordings seeded successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
