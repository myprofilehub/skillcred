import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
dotenv.config();

process.env.DATABASE_URL = "postgres://e3030ba87ac8177257d8211b1081df792501d0daaa1c6f396f1cdbcf37f9727b:sk_1ESq55JR-KYAit4grXRw4@pooled.db.prisma.io:5432/postgres?uselibpqcompat=true&sslmode=require&pgbouncer=true";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$queryRaw`SELECT * FROM _prisma_migrations`;
  console.log(result);
}

main().catch(console.error).finally(() => prisma.$disconnect());
