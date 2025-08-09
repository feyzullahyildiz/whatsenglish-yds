"use client";

import React from "react";

import { useRunOnce } from "@/hooks/useRunOnce";

import { Button } from "../ui/button";
import { VocabularyItem } from "./VocabularyItem";
import { NulishVocabulary, useAtomVocabularies } from "./atomVocabularities";

interface Props {
  dayNumber: number;
  defaultVocabularies: NulishVocabulary[];
}
export const EditDayItem: React.FC<Props> = ({
  dayNumber,
  defaultVocabularies,
}) => {
  const [vocabularies, setVocabularies] = useAtomVocabularies();
  useRunOnce({
    fn: () => {
      const len = defaultVocabularies.length;
      if (len >= 30) return;
      const extra = 30 - len;
      const arrar = new Array(extra).fill(undefined);
      setVocabularies((prev) => [...prev, ...arrar]);
    },
  });

  const onAddClick = () => {
    setVocabularies((prev) => [...prev, undefined]);
  };
  const onSave = (vocabs: NulishVocabulary[]) => {
    // "use server";
    // console.log(vocabs);
  };
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl">Gün {dayNumber} EDIT</h1>
        <Button onClick={() => onSave(vocabularies)}>Save</Button>
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:gap-x-16">
        {vocabularies.map((_, index) => (
          <VocabularyItem index={index} key={index} />
        ))}
      </div>
      <div className="flex justify-end">
        <Button onClick={onAddClick}>Add</Button>
      </div>
    </div>
  );
};
