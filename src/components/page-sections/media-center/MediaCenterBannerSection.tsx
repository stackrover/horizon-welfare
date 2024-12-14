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

export function MediaCenterBannerSection({
  className,
}: {
  className?: string;
}) {
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
      hidden={
        serializedData.status !== "active" || data?.data?.results?.length === 0
      }
      className={cn("relative", className)}
    >
      <div className="h-[800px] w-full overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${serializedData.image}`}
          alt="Banner"
          className="h-[808px] max-h-[808px] min-w-[1800px]"
          width={1800}
          height={800}
          priority
          placeholder="blur"
          sizes="100vw"
          style={{ width: "100%", height: "100%" }}
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8VQ8AAnkBewKPWHQAAAAASUVORK5CYII="
        />
      </div>

      <div className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-10 bg-blend-overlay"></div>

      <div className="container absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col gap-y-4 rounded-lg bg-base-0/80 p-8 backdrop-blur-[5px] lg:left-[10%] lg:max-w-[728px] lg:-translate-x-0">
        <h1 className="text-3xl font-bold text-primary md:text-4xl xmd:text-5xl xmd:leading-[72px] xl:text-6xl">
          {serializedData.title}
        </h1>
        <p className="text-base font-normal leading-5 text-base-400">
          {serializedData.description}
        </p>
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <Link href={serializedData.donateNowBtnLink}>
            <Button
              type="button"
              className="h-10 w-full rounded-full px-4 text-base sm:h-[55px] sm:w-fit sm:px-8 sm:text-lg"
            >
              {serializedData.donateNowBtnTitle}
            </Button>
          </Link>

          <Link href={serializedData.watchVideoBtnLink}>
            <Button
              type="button"
              variant="outline"
              className="group h-10 w-full gap-x-2 rounded-full px-4 text-base sm:h-[55px] sm:w-fit sm:px-8 sm:text-lg"
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
