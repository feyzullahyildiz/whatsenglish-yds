"use client";

import React, { FC } from "react";

import { IDictionaryApiResponse } from "@/types/IDictionaryApiResponse";

interface Props {
  data: IDictionaryApiResponse;
}
export const DictionaryApiStats: FC<Props> = ({ data }) => {
  if (!data) return null;
  return (
    <div className="flex gap-2">
      {data.map((item, index) => (
        <Item key={index} item={item} />
      ))}
    </div>
  );
};

function Item({ item }: { item: IDictionaryApiResponse[0] }) {
  return (
    <div className="flex gap-2">
      {item.meanings
        .filter((p) => p.partOfSpeech)
        .map((p, i) => (
          <div className="flex items-center text-sm italic" key={i}>
            <span>({p.partOfSpeech})</span>
          </div>
        ))}
    </div>
  );
}
