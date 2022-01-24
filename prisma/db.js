import { PrismaClient } from "@prisma/client";

export let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    log: ["error"],
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ["error"],
    });
  }
  prisma = global.prisma;
}
