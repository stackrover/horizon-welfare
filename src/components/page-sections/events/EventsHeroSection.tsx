"use client";

import { Loader, SectionWrapper } from "@/components";
import { Button } from "@/components/ui/button";
import { MediaCenterBanner } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn } from "@/lib/utils";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";
import PlayerIcon from "../../../../public/icons/PlayerIcon";

export function EventsHeroSection({ className }: { className?: string }) {
  const { data, isLoading, isError } = useSWR("/media/page/cta/show");

  if (isLoading) {
    return <Loader className="h-[630px]" />;
  }

  const serializedData = new MediaCenterBanner(_.head(data?.data?.results));

  console.log(serializedData);

  return (
    <SectionWrapper
      isLoading={isLoading}
      isError={isError}
      errorClass="h-[630px]"
      loadingClass="h-[630px]"
      hidden={serializedData.status !== "active"}
      className={cn("relative", className)}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${serializedData.image}`}
        alt="Banner"
        className="max-h-[808px] w-full"
        width={1800}
        height={800}
        priority
      />

      <div className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-10 bg-blend-overlay"></div>

      <div className="absolute left-60 top-1/2 flex max-w-[728px] -translate-y-1/2 flex-col gap-y-4 rounded-lg bg-base-0/80 p-8 backdrop-blur-[5px]">
        <h1 className="text-6xl font-bold leading-[72px] text-primary">
          {serializedData.title}
        </h1>
        <p className="text-base font-normal leading-5 text-base-400">
          {serializedData.description}
        </p>
        <div className="flex items-center gap-4">
          <Link href={serializedData.donateNowBtnLink}>
            <Button
              type="button"
              className="h-[55px] rounded-full px-8 text-lg"
            >
              {serializedData.donateNowBtnTitle}
            </Button>
          </Link>

          <Link href={serializedData.watchVideoBtnLink} target="_blank">
            <Button
              type="button"
              variant="outline"
              className="group h-[55px] gap-x-2 rounded-full px-8 text-lg"
            >
              <PlayerIcon className="h-6 w-6 fill-primary group-hover:fill-base-0" />
              <span>{serializedData.watchVideoBtnTitle}</span>
            </Button>
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
