"use server";

import { SimpleVocabulary } from "@/components/edit/atomVocabularities";

import { findDayWithVocabularies } from "@/lib/findDayWithVocabularies";
import { Vocabulary } from "@/lib/generated/prisma";
import prisma from "@/lib/prisma";

/**
 *
 * TODO eski verileri silmeden yapsak güzel olur.
 */
export const saveDay = async (
  name: number,
  nextVocabularies: SimpleVocabulary[],
) => {
  const day = await findDayWithVocabularies(name);
  if (!day) {
    throw new Error("Day not found");
  }
  if (nextVocabularies.length === day.vocabularies.length) {
    // UPDATE YAPALIM...
    for (let i = 0; i < nextVocabularies.length; i++) {
      const prev = day.vocabularies[i];
      const next = nextVocabularies[i];

      const word = next.word.trim();

      const dictionaryapiRes = await getUpdatedVocabularyResult(prev, next);
      await prisma.vocabulary.update({
        where: {
          id: prev.id,
        },
        data: {
          word,
          definition: next.definition.trim(),
          dictionaryapiResponse: dictionaryapiRes.dictionaryapiResponse,
          dictionaryapiVocabulary: dictionaryapiRes.dictionaryapiVocabulary,
        },
      });
    }
    return;
  }

  const dictionaryapiPromises = nextVocabularies
    .filter((v) => v)
    .map(async (v) => {
      if (!v) return null;
      return getDictionaryApiRes(v.word);
    });
  const dictionaryapiRes = await Promise.all(dictionaryapiPromises);
  await prisma.vocabulary.deleteMany({
    where: {
      dayId: day.id,
    },
  });
  await prisma.vocabulary.createMany({
    data: nextVocabularies.map((v, index) => ({
      dayId: day.id,
      definition: v!.definition,
      word: v!.word,
      dictionaryapiResponse: dictionaryapiRes[index],
      dictionaryapiVocabulary: v!.word,
    })),
  });
};

async function getDictionaryApiRes(word: string) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  const rawResult = await fetch(url, { cache: "no-cache" });
  if (!rawResult.ok) return null;
  const result = await rawResult.json();
  return result;
}

async function getUpdatedVocabularyResult(
  prev: Vocabulary,
  next: SimpleVocabulary,
) {
  const word = next.word.trim();
  if (prev.dictionaryapiVocabulary === word && prev.dictionaryapiResponse) {
    // console.log("FROM CACHE", word);
    // eski veri gelsin
    return {
      dictionaryapiResponse: prev.dictionaryapiResponse,
      dictionaryapiVocabulary: word,
    };
  }
  // console.log("MAKING A REQUEST TO API", word);
  return {
    dictionaryapiResponse: await getDictionaryApiRes(word),
    dictionaryapiVocabulary: word,
  };
}
