import React from "react";

import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";

import prisma from "@/lib/prisma";

interface PageProps {
  params: {
    day: string;
  };
}
export default async function Page({ params }: PageProps) {
  const dayValue = await params.day;
  const dayNumber = parseInt(dayValue, 10);

  const dayEntity = await prisma.day.findFirst({
    where: {
      name: dayNumber,
    },
  });
  if (!dayEntity) {
    notFound();
  }

  return (
    <div className="mx-auto container">
      <div className=" justify-between flex">
        <h1>Gün {dayNumber} </h1>
        <Link href={`/day/${dayNumber}/edit`}>
          <Button>Edit</Button>
        </Link>
      </div>
    </div>
  );
}
