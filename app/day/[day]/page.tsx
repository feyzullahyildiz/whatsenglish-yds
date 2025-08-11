import React from "react";

import { notFound } from "next/navigation";

import { FaUniversity } from "react-icons/fa";
import { MdGTranslate } from "react-icons/md";
import { SiDeepl } from "react-icons/si";

import { DictionaryApiRenderer } from "@/components/DictionaryApiRenderer";
import { DictionaryApiStats } from "@/components/DictionaryApiStats";
import { TranslateLink } from "@/components/TranslateLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { findDayWithVocabularies } from "@/lib/findDayWithVocabularies";
import { cn } from "@/lib/utils";

import { GoEdit } from "../_components/GoEdit";

interface PageProps {
  params: Promise<{
    day: string;
  }>;
}
export const dynamic = "force-dynamic";
export const revalidate = 60; // 1 dakika

export default async function Page({ params }: PageProps) {
  const { day } = await params;
  const dayNumber = parseInt(day, 10);

  const dayEntity = await findDayWithVocabularies(dayNumber);
  if (!dayEntity) {
    notFound();
  }

  return (
    <div className="container mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl">Day {dayNumber}</h1>
        <GoEdit dayNumber={dayNumber} />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {dayEntity.vocabularies.map((v, index) => (
          <Card key={v.id} className="flex flex-col">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <h3 className="text-lg underline underline-offset-4 md:text-3xl">
                    {v.word}
                  </h3>
                  <span>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <DictionaryApiStats data={v.dictionaryapiResponse as any} />
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <TranslateLink
                    name="DictionaryAPI"
                    link={`https://api.dictionaryapi.dev/api/v2/entries/en/${v.word}`}
                    icon={"API"}
                  />
                  <TranslateLink
                    name="Cambridge Dictionary"
                    link={`https://dictionary.cambridge.org/dictionary/english/${v.word}`}
                    icon={<FaUniversity />}
                  />
                  <TranslateLink
                    name="DeepL"
                    link={`https://www.deepl.com/tr/translator#en/tr/${v.word}`}
                    icon={<SiDeepl />}
                  />
                  <TranslateLink
                    name="Google Translate"
                    link={`https://translate.google.com/?sl=en&tl=tr&text=${v.word}&op=translate`}
                    icon={<MdGTranslate />}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-2">
              <div
                className={cn(
                  "text-primary whitespace-break-spaces",
                  "bg-secondary px-4 py-2 rounded-lg",
                )}
              >
                {v.definition}
              </div>
              {v.dictionaryapiResponse && (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <DictionaryApiRenderer data={v.dictionaryapiResponse as any} />
              )}
              <div className="flex-1"></div>
              <Button variant="outline" disabled={!v.dictionaryapiResponse}>
                Examples and Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
