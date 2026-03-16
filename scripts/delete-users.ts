import { PrismaClient } from '@prisma/client';
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  console.log('Deleting all accounts...');
  await prisma.account.deleteMany({});
  
  console.log('Deleting all sessions...');
  await prisma.session.deleteMany({});

  console.log('Deleting all users...');
  // This will cascade and delete Student, Mentor, HR, Profile, etc.
  const deletedUsers = await prisma.user.deleteMany({});
  
  console.log(`Successfully deleted ${deletedUsers.count} users and their associated records.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
