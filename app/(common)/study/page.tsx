import React from "react";

import { StudyDaySelect } from "@/components/study/StudyDaySelect";

import prisma from "@/lib/prisma";

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
    <div className="container mx-auto">
      <StudyDaySelect days={days} />
    </div>
  );
}
