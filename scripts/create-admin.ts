import { prisma } from "../lib/db";
import bcrypt from "bcryptjs";

async function main() {
  const email = "admin@skillcred.com";
  const password = await bcrypt.hash("admin123", 10);
  
  await prisma.user.upsert({
    where: { email },
    update: { role: "ADMIN", password },
    create: {
      email,
      name: "SkillCred Admin",
      role: "ADMIN",
      password,
    }
  });
  console.log("Admin created: admin@skillcred.com / admin123");
}
main().catch(console.error).finally(() => prisma.$disconnect());
