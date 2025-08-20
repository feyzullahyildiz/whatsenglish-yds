import React from "react";

import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { VocabularyList } from "@/components/vocabulary/VocabularyList";

import { findDayWithVocabularies } from "@/lib/findDayWithVocabularies";

import { GoEdit } from "../_components/GoEdit";

interface PageProps {
  params: Promise<{
    day: string;
  }>;
}
export const dynamic = "force-dynamic";
export const revalidate = 60; // 1 dakika

export default async function Page({ params }: PageProps) {
  const { day } = await params;
  const dayNumber = parseInt(day, 10);

  const nextDayUrl = `/day/${dayNumber + 1}`;
  const prevDayUrl = `/day/${dayNumber - 1}`;

  const dayEntity = await findDayWithVocabularies(dayNumber);
  if (!dayEntity) {
    notFound();
  }

  return (
    <div className="container mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <span className="w-8"></span>
        <div className="flex items-end gap-4">
          <Link href={prevDayUrl}>
            <Button variant="outline" size="sm">
              Go Prev Day
            </Button>
          </Link>
          <h1 className="text-4xl">Day {dayNumber}</h1>
          <Link href={nextDayUrl}>
            <Button variant="outline" size="sm">
              Go Next Day
            </Button>
          </Link>
        </div>
        <GoEdit dayNumber={dayNumber} />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <VocabularyList vocabularies={dayEntity.vocabularies} />
      </div>
    </div>
  );
}
