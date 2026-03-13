import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient;
    pool: Pool;
};

// Create a singleton pg Pool
const pool = globalForPrisma.pool || new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Create the Prisma adapter using the pool
const adapter = new PrismaPg(pool);

// Create a singleton PrismaClient with the adapter
export const prisma = globalForPrisma.prisma || new PrismaClient({
    adapter,
    log: ['warn', 'error'],
});

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
    globalForPrisma.pool = pool;
}
