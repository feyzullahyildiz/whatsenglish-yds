"use client";

import React, { FC, memo, useMemo, useState } from "react";

import { CheckCheck, X as Cross } from "lucide-react";
import { toast } from "sonner";

import { randomSortArray } from "@/lib/randomSortArray";

import { Button } from "../ui/button";

interface Props {
  answer: string;
  otherOptions: string[];
}
export const StudyItemOptions: FC<Props> = memo(({ answer, otherOptions }) => {
  const [resolved, setResolved] = useState(false);
  const [clickedIndexes, setClickedIndexes] = useState<number[]>([]);
  const options = useMemo(() => {
    const somePotansialOptions = randomSortArray(otherOptions)
      .filter((o) => o !== answer)
      .filter((_, index) => index < 4);
    const arr = [
      ...somePotansialOptions.map((o) => ({ correct: false, text: o })),
      { correct: true, text: answer },
    ];
    return randomSortArray(arr);
  }, [answer, otherOptions]);
  return (
    <div className="flex max-h-96 flex-col gap-2 overflow-auto">
      {options.map((option, index) => (
        <Button
          key={index}
          variant="outline"
          className="flex h-auto w-full justify-start whitespace-break-spaces"
          disabled={resolved || clickedIndexes.includes(index)}
          onClick={() => {
            if (option.correct) {
              toast.success("Correct answer!", {
                richColors: true,
                duration: 2000,
              });
              setResolved(true);
            } else {
              toast.error("Wrong answer!", {
                richColors: true,
                duration: 2000,
              });
            }
            setClickedIndexes((prev) => [...prev, index]);
          }}
        >
          <div className="flex w-full items-center justify-between gap-2">
            <span>{option.text}</span>
            {clickedIndexes.includes(index) && (
              <div className="flex items-center gap-2">
                {option.correct ? (
                  <CheckCheck className="text-green-400" />
                ) : (
                  <Cross className="text-red-500" />
                )}
              </div>
            )}
          </div>
        </Button>
      ))}
    </div>
  );
});
StudyItemOptions.displayName = "StudyItemOptions";
