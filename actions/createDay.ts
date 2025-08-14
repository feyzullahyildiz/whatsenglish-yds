"use server";

import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";

export const createDay = async (value: number) => {
  const session = await getServerSession();
  if (!session) {
    throw new Error("Not authenticated");
  }
  await prisma.day.create({
    data: {
      name: value,
      date: "",
    },
  });
};
