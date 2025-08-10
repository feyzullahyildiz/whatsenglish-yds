import React from "react";

import { notFound } from "next/navigation";

import { DictionaryApiRenderer } from "@/components/DictionaryApiRenderer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
    include: {
      vocabularies: true,
    },
  });
  if (!dayEntity) {
    notFound();
  }

  return (
    <div className="container mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl">Day {dayNumber}</h1>
        <GoEdit dayNumber={dayNumber} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {dayEntity.vocabularies.map((v) => (
          <Card key={v.id} className="p-4">
            <CardHeader>
              <div className="text-2xl underline underline-offset-4">
                {v.word}
              </div>
            </CardHeader>
            <CardContent>
              <div>{v.definition}</div>
              {v.dictionaryapiResponse && (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <DictionaryApiRenderer data={v.dictionaryapiResponse as any} />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
// rovAY7ZNBI6L7c
