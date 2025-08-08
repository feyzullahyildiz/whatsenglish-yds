import React, { FC } from "react";

import { Vocabulary } from "@/lib/generated/prisma";

import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface Props {
  vocabulary?: Vocabulary;
  index: number;
}
export const VocabularyItem: FC<Props> = ({ vocabulary, index }) => {
  return (
    <Card className="flex items-center gap-4">
      <CardContent className="flex w-full flex-col items-center gap-4">
        <div className="flex w-full items-center gap-4">
          <Badge
            className="size-7 text-lg rounded-full px-1 font-mono tabular-nums"
            variant="default"
          >
            {index + 1}
          </Badge>
          <Input
            className="flex-1"
            placeholder="Vocabulary"
            value={vocabulary?.word}
          />
        </div>
        <Textarea placeholder="Turkish meaning"></Textarea>
      </CardContent>
    </Card>
  );
};
