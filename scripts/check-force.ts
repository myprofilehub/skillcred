import { prisma } from "../lib/db";

async function main() {
    const user = await prisma.user.findUnique({ where: { email: "mgmags25@gmail.com" } });
    console.log("forcePasswordChange:", user?.forcePasswordChange);
}

main().catch(console.error).finally(() => prisma.$disconnect());
