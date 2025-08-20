import React, { FC } from "react";

import { FaUniversity } from "react-icons/fa";
import { MdGTranslate } from "react-icons/md";
import { SiDeepl } from "react-icons/si";

import { DictionaryApiRenderer } from "@/components/DictionaryApiRenderer";
import { DictionaryApiStats } from "@/components/DictionaryApiStats";
import { TranslateLink } from "@/components/TranslateLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Vocabulary } from "@/lib/generated/prisma";
import { cn } from "@/lib/utils";

interface Props {
  vocabulary: Vocabulary;
  onDetailsClick: (v: Vocabulary) => void;
  onTranslateLinkClick?: (url: string) => void;
}

export const VocabularyItem: FC<Props> = ({
  vocabulary,
  onDetailsClick,
  onTranslateLinkClick,
}) => {
  return (
    <Card key={vocabulary.id} className="flex flex-col">
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <h3 className="text-lg underline underline-offset-4 md:text-3xl">
              {vocabulary.word}
            </h3>
            <span>
              <DictionaryApiStats
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data={vocabulary.dictionaryapiResponse as any}
              />
            </span>
          </div>
          <div className="flex items-center gap-4">
            <TranslateLink
              name="DictionaryAPI"
              link={`https://api.dictionaryapi.dev/api/v2/entries/en/${vocabulary.word}`}
              icon={"API"}
              onClick={onTranslateLinkClick}
            />
            <TranslateLink
              name="Cambridge Dictionary"
              link={`https://dictionary.cambridge.org/dictionary/english/${vocabulary.word}`}
              icon={<FaUniversity />}
            />
            <TranslateLink
              name="DeepL"
              link={`https://www.deepl.com/tr/translator#en/tr/${vocabulary.word}`}
              icon={<SiDeepl />}
            />
            <TranslateLink
              name="Google Translate"
              link={`https://translate.google.com/?sl=en&tl=tr&text=${vocabulary.word}&op=translate`}
              icon={<MdGTranslate />}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-2">
        <div
          className={cn(
            "text-primary whitespace-break-spaces",
            "bg-secondary rounded-lg px-4 py-2",
          )}
        >
          {vocabulary.definition}
        </div>
        {vocabulary.dictionaryapiResponse && (
          <DictionaryApiRenderer
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data={vocabulary.dictionaryapiResponse as any}
          />
        )}
        <div className="flex-1"></div>
        <Button
          variant="outline"
          disabled={!vocabulary.dictionaryapiResponse}
          onClick={() => onDetailsClick(vocabulary)}
        >
          Examples and Details
        </Button>
      </CardContent>
    </Card>
  );
};
