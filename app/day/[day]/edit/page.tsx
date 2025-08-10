import React from "react";

import { notFound } from "next/navigation";

import { EditDayItem } from "@/components/edit/EditDayItem";

import { findDayWithVocabularies } from "@/lib/findDayWithVocabularies";

interface PageProps {
  params: Promise<{
    day: string;
  }>;
}
export default async function Page({ params }: PageProps) {
  const { day } = await params;
  const dayNumber = parseInt(day, 10);
  if (isNaN(dayNumber)) {
    return notFound();
  }
  const dayEntity = await findDayWithVocabularies(dayNumber);
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
