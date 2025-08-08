import { PrismaClient } from "../lib/generated/prisma";

const prisma = new PrismaClient();

export async function main() {
  const startDate = new Date("2025-08-10");
  for (let i = 1; i <= 160; i++) {
    const nextDate = new Date(startDate);
    nextDate.setDate(startDate.getDate() + i);
    await prisma.day.create({
      data: {
        name: i,
        completed: false,
        date: nextDate.toISOString().split("T")[0],
      },
    });
  }
}

main();
