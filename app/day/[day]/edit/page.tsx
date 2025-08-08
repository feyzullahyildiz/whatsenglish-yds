import React from "react";

import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";

interface PageProps {
  params: {
    day: string;
  };
}
export default async function Page({ params }: PageProps) {
  const dayNumber = parseInt(params.day, 10);
  if (isNaN(dayNumber)) {
    return redirect("/");
  }
  const dayEntity = await prisma.day.findFirst({
    where: {
      name: dayNumber,
    },
  });

  return (
    <div className="container mx-auto">
      <h1>Gün {dayNumber}</h1>
      Page
    </div>
  );
}
