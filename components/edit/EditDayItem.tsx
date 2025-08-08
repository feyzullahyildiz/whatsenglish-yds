"use client";

import React, { useState } from "react";

import { useRunOnce } from "@/hooks/useRunOnce";

import { Vocabulary } from "@/lib/generated/prisma";

import { Button } from "../ui/button";
import { VocabularyItem } from "./VocabularyItem";

type NulishVocabulary = Vocabulary | undefined;
interface Props {
  defaultVocabularies: Vocabulary[];
}
export const EditDayItem: React.FC<Props> = ({ defaultVocabularies }) => {
  const [vocabularies, setVocabularies] =
    useState<NulishVocabulary[]>(defaultVocabularies);
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
  return (
    <div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:gap-x-16">
        {vocabularies.map((vocabulary, index) => (
          <VocabularyItem index={index} key={index} vocabulary={vocabulary} />
        ))}
      </div>
      <div className="flex justify-end">
        <Button onClick={onAddClick}>Add</Button>
      </div>
    </div>
  );
};
