import prisma from "./prisma";

export async function findDayWithVocabularies(name: number) {
  return await prisma.day.findFirst({
    where: { name },
    include: {
      vocabularies: {
        orderBy: {
          index: "asc",
        },
      },
    },
  });
}
