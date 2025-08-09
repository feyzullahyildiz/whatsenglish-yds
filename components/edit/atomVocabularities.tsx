import { useAtom } from "jotai";
import { atomWithImmer } from "jotai-immer";

import { Vocabulary } from "@/lib/generated/prisma";

export type SimpleVocabulary = Pick<Vocabulary, "word" | "definition">;
export type NulishVocabulary = SimpleVocabulary | undefined;

const vocabulariesAtom = atomWithImmer<NulishVocabulary[]>([]);

export const useAtomVocabularies = () => useAtom(vocabulariesAtom);
