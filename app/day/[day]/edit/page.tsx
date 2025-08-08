import React from "react";

import { notFound, redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { EditDayItem } from "@/components/edit/EditDayItem";

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
      <h1>Gün {dayNumber} EDIT</h1>

      <EditDayItem defaultVocabularies={vocabularies} />
    </div>
  );
}
