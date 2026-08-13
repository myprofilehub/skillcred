const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const data = await prisma.counselorAssessment.findMany({
    select: { id: true, candidateName: true, status: true, voiceTamilUrl: true, voiceEnglishUrl: true, objection1Url: true }
  });
  console.log(JSON.stringify(data, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
