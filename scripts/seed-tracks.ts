import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding tracks...');
  
  const tracksToCreate = [
    { title: 'Full Stack Development', slug: 'full-stack', description: 'Learn MERN stack and Next.js', icon: '💻' },
    { title: 'AI & Machine Learning', slug: 'ai-ml', description: 'Python, PyTorch, and GenAI', icon: '🤖' },
    { title: 'Cloud Computing', slug: 'cloud', description: 'AWS, Azure, and DevOps', icon: '☁️' },
    { title: 'Cyber Security', slug: 'security', description: 'Ethical Hacking and InfoSec', icon: '🔐' }
  ];

  for (const track of tracksToCreate) {
    const existing = await prisma.track.findUnique({ where: { slug: track.slug } });
    if (!existing) {
      await prisma.track.create({ data: track });
      console.log(`Created track: ${track.title}`);
    } else {
      console.log(`Track already exists: ${track.title}`);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
