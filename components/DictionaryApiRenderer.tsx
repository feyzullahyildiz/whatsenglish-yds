"use client";

import React, { FC, useRef } from "react";

import { IDictionaryApiResponse } from "@/types/IDictionaryApiResponse";

import { Button } from "./ui/button";

interface Props {
  data: IDictionaryApiResponse;
}
export const DictionaryApiRenderer: FC<Props> = ({ data }) => {
  if (!data) return null;
  return (
    <div className="flex flex-col gap-2">
      {data.map((item, index) => (
        <Item key={index} item={item} />
      ))}
    </div>
  );
};

function Item({ item }: { item: IDictionaryApiResponse[0] }) {
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const onPlay = (index: number) => {
    const audio = audioRefs.current[index];
    if (audio) {
      audio.play();
    }
  };
  return (
    <div className="flex flex-col gap-2">
      {item.phonetics
        .filter((p) => p.audio)
        .map((p, i) => (
          <div className="flex items-center justify-between gap-4" key={i}>
            <span>{p.text}</span>
            <Button variant="outline" size="lg" onClick={() => onPlay(i)}>
              PLAY
            </Button>
            <audio
              className="hidden"
              controls
              ref={(ref) => {
                if (ref) {
                  audioRefs.current[i] = ref;
                }
              }}
            >
              <source src={p.audio} type="audio/mpeg"></source>
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
    </div>
  );
}
