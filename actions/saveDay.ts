"use server";

import { NulishVocabulary } from "@/components/edit/atomVocabularities";

import prisma from "@/lib/prisma";

/**
 *
 * TODO eski verileri silmeden yapsak güzel olur.
 */
export const saveDay = async (
  name: number,
  vocabularies: NulishVocabulary[],
) => {
  const day = await prisma.day.findFirst({ where: { name } });
  if (!day) {
    throw new Error("Day not found");
  }
  await prisma.vocabulary.deleteMany({
    where: {
      dayId: day.id,
    },
  });
  const dictionaryapiPromises = vocabularies
    .filter((v) => v)
    .map(async (v) => {
      if (!v) return null;
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${v.word}`;
      const result = await fetch(url, { cache: "no-cache" }).then((r) =>
        r.json(),
      );
      return result;
    });
  const dictionaryapiRes = await Promise.all(dictionaryapiPromises);
  await prisma.vocabulary.deleteMany({
    where: {
      dayId: day.id,
    },
  });
  // console.log("dictionaryapiRes", dictionaryapiRes);
  await prisma.vocabulary.createMany({
    data: vocabularies
      .filter((v) => v)
      .map((v, index) => ({
        dayId: day.id,
        definition: v!.definition,
        word: v!.word,
        dictionaryapiResponse: dictionaryapiRes[index],
        dictionaryapiVocabulary: v!.word,
      })),
  });
};
