import { Vocabulary } from "@/lib/generated/prisma";
import React, { FC } from "react";
import { Input } from "../ui/input";

interface Props {
  vocabulary?: Vocabulary;
  index: number;
}
export const VocabularyItem: FC<Props> = ({ vocabulary, index }) => {
  return (
    <div className="flex gap-4 items-center">
      {index + 1}.{" "}
      <Input   value={vocabulary?.word} />
    </div>
  );
};
