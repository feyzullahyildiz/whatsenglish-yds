import Link from "next/link";

import { CheckCheck } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import prisma from "@/lib/prisma";

export default async function Home() {
  const days = await prisma.day.findMany({});

  return (
    <div className="container mx-auto grid grid-cols-7">
      {days.map((day) => (
        <Link key={day.name} href={`/day/${day.name}`}>
          <Card className="m-2 flex size-32 items-center justify-center">
            <CardContent className="flex flex-col items-center">
              <div>Gün {day.name}</div>

              <span className="text-xs">{day.date}</span>
              {day.completed && <CheckCheck />}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
