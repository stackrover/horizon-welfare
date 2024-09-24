"use client";

import { IconUser } from "@tabler/icons-react";
import Image from "next/image";

type CardData = {
  imageUrl: string;
  title: string;
  userImgUrl: string;
  userName: string;
  publishingDate: string;
};

export function BlogCard({ cardData }: { cardData: CardData }) {
  return (
    <div className="group overflow-hidden rounded-xl border shadow">
      <div className="m-4 overflow-hidden rounded-lg">
        <Image
          src={cardData.imageUrl}
          alt="Donation"
          loading="lazy"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Vg8AAnEBdzTCX3oAAAAASUVORK5CYII="
          placeholder="blur"
          className="h-[240px] w-full transition-all duration-300 ease-in-out group-hover:scale-105"
          height={240}
          width={500}
        />
      </div>
      <div className="flex flex-col gap-y-4 px-4 py-5">
        <span className="w-fit bg-[#4B6BFB]/5 px-2.5 py-1 text-sm font-medium leading-5 text-[#4B6BFB]">
          WASH
        </span>
        <h3 className="text-2xl font-semibold leading-8 text-base-400">
          {cardData.title}
        </h3>
        <div className="h-1 w-full rounded-full bg-primary/30">
          <div className="h-full w-2/3 rounded-full bg-primary" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-3 font-medium">
            <IconUser size={36} className="rounded-full bg-primary" />
            <h4 className="text-lg font-medium leading-6 text-base-300">
              {cardData.userName}
            </h4>
          </div>
          <h4 className="font-medium">{cardData.publishingDate}</h4>
        </div>
      </div>
    </div>
  );
}
