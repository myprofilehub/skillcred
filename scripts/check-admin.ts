import { prisma } from "../lib/db";
async function main() {
  const admins = await prisma.user.findMany({ where: { role: "ADMIN" } });
  console.log("Admins:", admins.map(a => a.email));
}
main().catch(console.error).finally(() => prisma.$disconnect());
