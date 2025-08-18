"use client";

import React, { FC, useState } from "react";

import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";

import { Day } from "@/lib/generated/prisma";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Props {
  days: Day[];
}
export const StudyDaySelect: FC<Props> = ({ days }) => {
  const [wrongAnswerCount, setWrongAnswerCount] = useState(3);
  const [selectedDays, setSelectedDays] = useState<Array<number>>([]);
  const router = useRouter();

  const onClickStart = () => {
    if (selectedDays.length === 0) {
      return;
    }
    const url = `/study/${wrongAnswerCount}/${selectedDays.join("/")}`;
    router.push(url);
  };
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 lg:grid-cols-7">
        {days.map((day) => (
          <Toggle
            key={day.name}
            size="default"
            className="h-auto w-auto p-4 select-none"
            asChild
            pressed={selectedDays.includes(day.name)}
            onPressedChange={(pressed) => {
              setSelectedDays((prev) => {
                if (pressed) {
                  return [...prev, day.name];
                }
                return prev.filter((d) => d !== day.name);
              });
            }}
          >
            <Card
              className={cn(
                "flex h-32 min-w-32 items-center justify-center",
                "data-[state=on]:border-accent-foreground",
              )}
            >
              <CardContent className="flex flex-col items-center">
                <div>Day {day.name}</div>

                <span className="text-xs">{day.date}</span>
              </CardContent>
            </Card>
          </Toggle>
        ))}
      </div>
      <div className="flex-1"></div>
      <div className="flex flex-col gap-4">
        <h1>Select study days and click Start Button</h1>
        <Label htmlFor="optionCount">Wrong answer count in a question</Label>
        <Input
          id="optionCount"
          type="number"
          value={wrongAnswerCount}
          onChange={(e) => setWrongAnswerCount(Number(e.target.value))}
          min={1}
          max={10}
        />
        <Button onClick={onClickStart} disabled={selectedDays.length === 0}>
          Start
        </Button>
      </div>
    </div>
  );
};
