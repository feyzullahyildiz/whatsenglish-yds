"use client";

import React, { useEffect, useState } from "react";

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
  useEffect(() => {
    const len = defaultVocabularies.length;
    if (len >= 30) return;
    const extra = 30 - len;
    const arrar = new Array(extra).fill(undefined);
    setVocabularies((prev) => [...prev, ...arrar]);
  }, []);

  const onAddClick = () => {
    setVocabularies((prev) => [...prev, undefined]);
  };
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 gap-x-16">
        {vocabularies.map((vocabulary, index) => (
          <VocabularyItem index={index} key={index} vocabulary={vocabulary} />
        ))}
      </div>

      <Button onClick={onAddClick}>Add</Button>
    </div>
  );
};
