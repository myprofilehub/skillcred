import { prisma } from '../lib/db'

async function main() {
  const lessons = await prisma.lesson.findMany({
    where: {
      type: 'VIDEO'
    },
    select: { id: true, title: true, contentUrl: true }
  })

  console.log(`Total VIDEO lessons: ${lessons.length}`)
  if (lessons.length > 0) {
    console.log(lessons.slice(0, 5)) // Print first 5 just to see
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
