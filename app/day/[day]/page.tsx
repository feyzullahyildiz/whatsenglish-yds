import React from "react";

import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";

import { GoEdit } from "../_components/GoEdit";

interface PageProps {
  params: {
    day: string;
  };
}
export default async function Page({ params }: PageProps) {
  const { day } = await params;
  const dayNumber = parseInt(day, 10);

  const dayEntity = await prisma.day.findFirst({
    where: {
      name: dayNumber,
    },
  });
  if (!dayEntity) {
    notFound();
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between">
        <h1>Gün {dayNumber} </h1>
        <GoEdit dayNumber={dayNumber} />
      </div>
    </div>
  );
}
