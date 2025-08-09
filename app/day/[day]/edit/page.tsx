import React from "react";

import { notFound } from "next/navigation";

import { EditDayItem } from "@/components/edit/EditDayItem";

import prisma from "@/lib/prisma";

interface PageProps {
  params: {
    day: string;
  };
}
export default async function Page({ params }: PageProps) {
  const { day } = await params;
  const dayNumber = parseInt(day, 10);
  if (isNaN(dayNumber)) {
    return notFound();
  }
  const dayEntity = await prisma.day.findFirst({
    where: {
      name: dayNumber,
    },
    include: {
      vocabularies: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  if (!dayEntity) {
    return notFound();
  }
  const vocabularies = dayEntity.vocabularies;

  return (
    <div className="container mx-auto">
      <EditDayItem dayNumber={dayNumber} defaultVocabularies={vocabularies} />
    </div>
  );
}
