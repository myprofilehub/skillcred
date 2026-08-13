const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const ass = await prisma.counselorAssessment.findFirst({
    where: { candidateEmail: 'gmsai35@gmail.com' }
  });
  console.log("triageScore:", ass.triageScore);
  console.log("triageFeedback:", ass.triageFeedback);
  console.log("triageInsight:", ass.triageInsight);
  console.log("triageData:", ass.triageData);
}
main().catch(console.error).finally(() => prisma.$disconnect());
