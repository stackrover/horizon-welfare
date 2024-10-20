"use client";

import { DonationCardProps } from "@/types/types";
import { IconGift } from "@tabler/icons-react";
import Image from "next/image";

export function DonationCard({ cardData }: { cardData: DonationCardProps }) {
  return (
    <div className="group overflow-hidden rounded-xl border shadow">
      <Image
        src={cardData.imageUrl}
        alt="Donation"
        loading="lazy"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Vg8AAnEBdzTCX3oAAAAASUVORK5CYII="
        placeholder="blur"
        className="w-full transition-all duration-300 ease-in-out group-hover:scale-105"
        height={175}
        width={500}
      />
      <div className="flex flex-col gap-y-4 px-4 py-5">
        <h3 className="text-2xl font-semibold leading-8 text-base-400">
          {cardData.title}
        </h3>
        <p className="text-base font-normal leading-6 text-base-300">
          {cardData.desc}
        </p>
        <div className="h-1 w-full rounded-full bg-primary/30">
          <div className="h-full w-2/3 rounded-full bg-primary" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-1 font-medium">
            <IconGift size={20} />
            <h4>৳ {cardData.collection}</h4>
          </div>
          <h4 className="font-medium">{cardData.percentage}%</h4>
        </div>
      </div>
    </div>
  );
}
