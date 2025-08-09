import React, { FC, useCallback } from "react";

import { Vocabulary } from "@/lib/generated/prisma";

import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { NulishVocabulary, useAtomVocabularies } from "./atomVocabularities";

interface Props {
  index: number;
}
export const VocabularyItem: FC<Props> = ({ index }) => {
  const [vocabularies, setVocabularies] = useAtomVocabularies();
  const onWordChange = useCallback(
    (word: string) => {
      setVocabularies((prev) => {
        const newVocabularies = [...prev];
        if (!newVocabularies[index]) {
          newVocabularies[index] = { word: "", definition: "" };
        }
        newVocabularies[index] = { ...newVocabularies[index], word };
        return newVocabularies;
      });
    },
    [index],
  );
  return (
    <Card className="flex items-center gap-4">
      <CardContent className="flex w-full flex-col items-center gap-4">
        <div className="flex w-full items-center gap-4">
          <Badge
            className="size-7 rounded-full px-1 font-mono text-lg tabular-nums"
            variant="default"
          >
            {index + 1}
          </Badge>
          <Input
            className="flex-1"
            placeholder="Vocabulary"
            value={vocabularies[index]?.word}
            onChange={(e) => onWordChange(e.target.value)}
          />
        </div>
        <Textarea placeholder="Turkish meaning"></Textarea>
      </CardContent>
    </Card>
  );
};
