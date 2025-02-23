"use client";

import { TruncateString } from "@/components";
import { ProjectType } from "@/types/types";
import { IconGift } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export function DonationCard({ cardData }: { cardData: ProjectType }) {
  const goalAmount = cardData?.goalAmount ? +cardData.goalAmount : 0;

  const totalCollection = cardData?.totalCollections
    ? +cardData.totalCollections
    : 0;

  const percentage = totalCollection / (goalAmount / 100);

  return (
    <div className="group overflow-hidden rounded-xl border shadow">
      <Image
        src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}${cardData.thumbnail}`}
        alt="Donation"
        loading="lazy"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Vg8AAnEBdzTCX3oAAAAASUVORK5CYII="
        placeholder="blur"
        className="w-full transition-all duration-300 ease-in-out group-hover:scale-105"
        height={175}
        width={500}
        quality={75}
      />
      <div className="flex flex-col gap-y-4 px-4 py-5">
        <h3 className="inline text-lg font-semibold text-base-400 xmd:text-xl xmd:leading-8 lg:text-2xl">
          <Link
            href={`/projects/details/${cardData.id}`}
            className="hover:text-primary"
          >
            <TruncateString length={50} separator="">
              {cardData.title}
            </TruncateString>
          </Link>
        </h3>
        <p className="text-sm font-normal leading-6 text-base-300 xmd:text-base">
          <TruncateString length={70} separator="">
            {cardData.description}
          </TruncateString>
        </p>
        <div className="h-1 w-full rounded-full bg-primary/30">
          <div
            style={{ width: `${percentage}%` }}
            className={`h-full rounded-full bg-primary`}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-1 text-sm font-medium xmd:text-base">
            <IconGift size={20} />
            <h4>৳ {cardData.goalAmount}</h4>
          </div>
          <h4 className="text-sm font-medium xmd:text-base">{percentage}%</h4>
        </div>
      </div>
    </div>
  );
}
