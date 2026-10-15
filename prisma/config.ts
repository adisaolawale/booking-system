import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

function createClient() {
  return new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL, max: 5 }),
    omit: { user: { password: true } },
  });
}

const globalForPrisma = globalThis as unknown as {
  prisma?: ReturnType<typeof createClient>;
};

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;



// import { PrismaClient } from "../src/generated/prisma/client.js";
// import { PrismaPg } from "@prisma/adapter-pg";
// import dotenv from "dotenv";
// dotenv.config();

// export const prisma = new PrismaClient({
//     adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
// });