import { prisma } from '../lib/db'

async function main() {
  console.log("Removing seeded mock recordings (dQw4w9WgXcQ)...")
  
  const result = await prisma.recording.deleteMany({
    where: { 
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
  })

  console.log(`Successfully removed ${result.count} mock recordings!`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
