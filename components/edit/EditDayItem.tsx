"use client";

import React, { useState } from "react";

import { saveDay } from "@/actions/saveDay";
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
  const [loading, setLoading] = useState(false);
  const [vocabularies, setVocabularies] = useAtomVocabularies();
  useRunOnce({
    fn: () => {
      const len = defaultVocabularies.length;
      if (len === 30) {
        setVocabularies(defaultVocabularies);
        return;
      }
      const array = new Array(30).fill(undefined);
      setVocabularies(() => [...defaultVocabularies, ...array]);
    },
  });

  const onAddClick = () => {
    setVocabularies((prev) => [...prev, undefined]);
  };
  const onSave = async (vocabs: NulishVocabulary[]) => {
    const filtered = vocabs.filter((v) => v !== undefined);
    setLoading(true);
    await saveDay(dayNumber, filtered);
    setLoading(false);
  };
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl">Day {dayNumber} EDIT</h1>
        <div>
          {loading && "loading"}
          <Button disabled={loading} onClick={() => onSave(vocabularies)}>
            Save
          </Button>
        </div>
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
