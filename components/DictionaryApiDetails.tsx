import React, {
  Fragment,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";

import { IDictionaryApiResponse } from "@/types/IDictionaryApiResponse";

import { Vocabulary } from "@/lib/generated/prisma";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

export interface DictionaryApiDetailsRef {
  start: (data: Vocabulary) => void;
}
// interface Props {}
export const DictionaryApiDetails = forwardRef<DictionaryApiDetailsRef>(
  (_, ref) => {
    const [open, setOpen] = useState(false);
    const [vocabulary, setVocabulary] = useState<Vocabulary | null>(null);
    useImperativeHandle(ref, () => ({
      start: (res) => {
        setVocabulary(res);
        setOpen(true);
      },
    }));
    if (!vocabulary) {
      return null;
    }
    if (!vocabulary.dictionaryapiResponse) {
      return null;
    }
    const dictionaryApiRes =
      vocabulary.dictionaryapiResponse as IDictionaryApiResponse;
    return (
      <Dialog open={!!vocabulary && open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="text-4xl capitalize">
              {vocabulary.word}
            </DialogTitle>
            <div className="p-4 text-left">
              {dictionaryApiRes.map((v, i) => (
                <Fragment key={i}>
                  <div className="">
                    {v.meanings.map((m, j) => (
                      <div key={j}>
                        <div className="text-2xl capitalize">
                          {m.partOfSpeech}
                        </div>
                        <ul key={j} className="ml-6">
                          {m.definitions
                            .filter((d) => d.example)
                            .map((d, j) => (
                              <li className="list-disc" key={j}>
                                {d.example}
                              </li>
                            ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Fragment>
              ))}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  },
);

DictionaryApiDetails.displayName = "DictionaryApiDetails";
