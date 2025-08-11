"use client";

import React, { FC, useRef } from "react";

import { Vocabulary } from "@/lib/generated/prisma";

import {
  DictionaryApiDetails,
  DictionaryApiDetailsRef,
} from "../DictionaryApiDetails";
import { VocabularyItem } from "./VocabularyItem";

interface Props {
  vocabularies: Vocabulary[];
}
export const VocabularyList: FC<Props> = ({ vocabularies }) => {
  const dialogRef = useRef<DictionaryApiDetailsRef>(null);
  const onDetailsClick = (v: Vocabulary) => {
    if (!dialogRef.current) return;
    if (!v) return;
    if (!v.dictionaryapiResponse) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dialogRef.current.start(v as any);
  };
  return (
    <>
      {vocabularies.map((v) => (
        <VocabularyItem
          onDetailsClick={onDetailsClick}
          key={v.id}
          vocabulary={v}
        />
      ))}
      <DictionaryApiDetails ref={dialogRef} />
    </>
  );
};
