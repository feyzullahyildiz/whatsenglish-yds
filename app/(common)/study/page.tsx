import React from "react";

import { StudyDaySelect } from "@/components/study/StudyDaySelect";

import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 60; // 1 dakika

export default async function Page() {
  const days = await prisma.day.findMany({
    orderBy: { name: "asc" },
    where: {
      vocabularies: {
        some: {},
      },
    },
  });
  return (
    <div className="container mx-auto flex flex-1 flex-col">
      <StudyDaySelect days={days} />
    </div>
  );
}
