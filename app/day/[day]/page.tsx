import React from "react";

import { notFound } from "next/navigation";

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

  const dayEntity = await findDayWithVocabularies(dayNumber);
  if (!dayEntity) {
    notFound();
  }

  return (
    <div className="container mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl">Day {dayNumber}</h1>
        <GoEdit dayNumber={dayNumber} />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <VocabularyList vocabularies={dayEntity.vocabularies} />
      </div>
    </div>
  );
}
