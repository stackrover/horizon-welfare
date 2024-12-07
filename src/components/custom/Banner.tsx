"use client";

import { SectionWrapper } from "@/components";
import { Button } from "@/components/ui/button";
import { Hero } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn } from "@/lib/utils";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";
import PlayerIcon from "../../../public/icons/PlayerIcon";

export function Banner({ className }: { className?: string }) {
  const { data, isLoading, isError } = useSWR("/home/hero");

  const serializedData = new Hero(_.head(data?.data?.results));

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
        className="h-[600px] max-h-[808px] w-full lg:h-fit"
        width={1800}
        height={800}
        priority
      />

      <div className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-10 bg-blend-overlay"></div>

      <div className="absolute left-1/2 top-1/2 flex max-w-[728px] -translate-x-1/2 -translate-y-1/2 flex-col gap-y-4 rounded-lg bg-base-0/80 p-8 backdrop-blur-[5px] xmd:left-[10%] xmd:-translate-x-0">
        <h1 className="text-3xl font-bold text-primary md:text-4xl xmd:text-5xl xmd:leading-[72px] xl:text-6xl">
          {serializedData.title}
        </h1>
        <p className="text-base font-normal leading-5 text-base-400">
          {serializedData.description}
        </p>
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <Link href={serializedData.donateNowBtLink}>
            <Button
              type="button"
              className="h-10 w-full rounded-full px-4 text-base sm:h-[55px] sm:w-fit sm:px-8 sm:text-lg"
            >
              {serializedData.donateNowBtTitle}
            </Button>
          </Link>

          <Link href={serializedData.watchVideoBtLink}>
            <Button
              type="button"
              variant="outline"
              className="group h-10 w-full gap-x-2 rounded-full px-4 text-base sm:h-[55px] sm:w-fit sm:px-8 sm:text-lg"
            >
              <PlayerIcon className="h-6 w-6 fill-primary group-hover:fill-base-0" />
              <span>{serializedData.watchVideoBtTitle}</span>
            </Button>
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
