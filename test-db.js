const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgres://e3030ba87ac8177257d8211b1081df792501d0daaa1c6f396f1cdbcf37f9727b:sk_1ESq55JR-KYAit4grXRw4@pooled.db.prisma.io:5432/postgres?sslmode=require&pgbouncer=true"
    }
  }
});

async function main() {
  const a = await prisma.counselorAssessment.findFirst({ where: { candidateEmail: 'gmsai35@gmail.com' } });
  console.log("Cumulative Score in DB:", a?.cumulativeScore);
  console.log("Feedback in DB:", a ? 'Exists' : 'Null');
}

main().catch(console.error).finally(() => prisma.$disconnect());
