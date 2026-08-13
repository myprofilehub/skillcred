const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasourceUrl: "postgres://e3030ba87ac8177257d8211b1081df792501d0daaa1c6f396f1cdbcf37f9727b:sk_1ESq55JR-KYAit4grXRw4@pooled.db.prisma.io:5432/postgres?sslmode=require&pgbouncer=true"
});

async function main() {
  const a = await prisma.counselorAssessment.findFirst({ where: { candidateEmail: 'gmsai35@gmail.com' } });
  if (a) {
    console.log("Found assessment! Score:", a.cumulativeScore);
    console.log("Feedback length:", a.cumulativeFeedback ? a.cumulativeFeedback.length : 0);
  } else {
    console.log("Assessment not found in DB.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
