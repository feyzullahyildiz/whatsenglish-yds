import React from "react";

import { StudySwiper } from "@/components/study/StudySwiper";

import prisma from "@/lib/prisma";
import { randomSortArray } from "@/lib/randomSortArray";

interface Props {
  params: Promise<{ dayNumbers: string[]; wrongAnswerCount: string }>;
}
export default async function Page({ params }: Props) {
  const { dayNumbers, wrongAnswerCount } = await params;
  const wrongAnswerCountNumber = Number(wrongAnswerCount);
  if (isNaN(wrongAnswerCountNumber)) {
    throw new Error("Invalid wrongAnswerCount");
  }
  const vocabularies = await prisma.vocabulary.findMany({
    where: {
      day: {
        name: {
          in: dayNumbers.map(Number),
        },
      },
    },
  });
  const randomizedVocabularies = randomSortArray(vocabularies);
  const otherOptions = vocabularies.map((v) => v.definition);
  return (
    <StudySwiper
      wrongAnswerCount={wrongAnswerCountNumber}
      vocabularies={randomizedVocabularies}
      otherOptions={otherOptions}
    />
  );
}
