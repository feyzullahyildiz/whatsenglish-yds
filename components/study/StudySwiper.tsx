"use client";

import { FC, useState } from "react";

import Link from "next/link";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import { Progress } from "@/components/ui/progress";

import { Vocabulary } from "@/lib/generated/prisma";

import { StudyItem } from "./StudyItem";

interface Props {
  vocabularies: Vocabulary[];
  otherOptions: string[];
  wrongAnswerCount: number;
}
export const StudySwiper: FC<Props> = ({
  vocabularies,
  otherOptions,
  wrongAnswerCount,
}) => {
  const [progress, setProgress] = useState(0);
  const value = (progress / (vocabularies.length + 1)) * 100;
  return (
    <>
      <div className="flex h-full flex-col gap-2 p-2">
        <Progress value={value} max={100} />

        <Swiper
          direction="vertical"
          slidesPerView={1}
          spaceBetween={0}
          // onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={(i) => {
            console.log("slide change", i.realIndex);
            setProgress(i.realIndex + 1);
          }}
          //   autoHeight={true}
          className="w-full flex-1"
        >
          {vocabularies.map((v) => (
            <SwiperSlide key={v.id} className="relative">
              <StudyItem
                vocabulary={v}
                otherOptions={otherOptions}
                wrongAnswerCount={wrongAnswerCount}
              />
            </SwiperSlide>
          ))}
          <SwiperSlide className="flex items-center justify-center bg-gray-800 p-2 text-2xl text-white">
            <div className="flex h-full flex-col items-center justify-center gap-8">
              <div>🎉 Completed!</div>
              <Link className="underline" href="/">
                Main Page
              </Link>
              <Link className="underline" href="/study">
                Return to Study Selection Page
              </Link>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};
