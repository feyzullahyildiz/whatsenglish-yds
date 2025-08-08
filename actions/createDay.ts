"use server";

import prisma from "@/lib/prisma";

export const createDay = async (value: number) => {
  await prisma.day.create({
    data: {
      name: value,
    },
  });
};
