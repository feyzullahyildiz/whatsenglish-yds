import Link from "next/link";

import { CheckCheck } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import prisma from "@/lib/prisma";

export default async function Home() {
  const days = await prisma.day.findMany({});

  return (
    <div className="mx-auto container grid grid-cols-7">
      {days.map((day) => (
        <Link key={day.name} href={`/day/${day.name}`}>
          <Card className="size-32 flex justify-center items-center m-2">
            <CardContent className="flex    items-center flex-col">
              <div>Gün {day.name}</div>

              <span className="text-xs">{day.date}</span>
              {day.completed && (
                <CheckCheck />
              )}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
