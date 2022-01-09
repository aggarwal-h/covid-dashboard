import { PrismaClient } from "@prisma/client";

let globalPrisma = undefined;

export const prisma =
  globalPrisma ||
  new PrismaClient({
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") globalPrisma = prisma;
