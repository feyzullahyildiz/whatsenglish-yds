import Link from "next/link";

import { CheckCheck } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 60; // 1 dakika

export default async function Home() {
  const days = await prisma.day.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="container mx-auto grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 lg:grid-cols-7">
      {days.map((day) => (
        <Link key={day.name} href={`/day/${day.name}`}>
          <Card className="flex h-32 min-w-32 items-center justify-center">
            <CardContent className="flex flex-col items-center">
              <div>Day {day.name}</div>

              <span className="text-xs">{day.date}</span>
              {day.completed && <CheckCheck color="green" />}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
