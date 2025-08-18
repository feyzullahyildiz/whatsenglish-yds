"use client";

import React, { FC } from "react";

import dynamic from "next/dynamic";

import { Vocabulary } from "@/lib/generated/prisma";

import { Card, CardContent, CardHeader } from "../ui/card";

const StudyItemOptions = dynamic(
  () => import("./StudyItemOptions").then((mod) => mod.StudyItemOptions),
  {
    ssr: false,
  },
);

interface Props {
  vocabulary: Vocabulary;
  otherOptions: string[];
}
export const StudyItem: FC<Props> = ({ vocabulary: v, otherOptions }) => {
  return (
    <Card className="flex h-full text-white">
      <CardHeader className="text-3xl">{v.word}</CardHeader>
      <div className="flex-1"></div>
      <CardContent>
        <div className="flex flex-col gap-2">
          <StudyItemOptions answer={v.definition} otherOptions={otherOptions} />
        </div>
      </CardContent>
    </Card>
  );
};
