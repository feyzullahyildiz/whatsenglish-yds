import React from "react";

import { StudySwiper } from "@/components/study/StudySwiper";

import prisma from "@/lib/prisma";

interface Props {
  params: Promise<{ dayNumbers: string[] }>;
}
export default async function Page({ params }: Props) {
  const { dayNumbers } = await params;
  const vocabularies = await prisma.vocabulary.findMany({
    where: {
      day: {
        name: {
          in: dayNumbers.map(Number),
        },
      },
    },
  });
  const otherOptions = vocabularies.map((v) => v.definition);
  return (
    <StudySwiper vocabularies={vocabularies} otherOptions={otherOptions} />
  );
}
