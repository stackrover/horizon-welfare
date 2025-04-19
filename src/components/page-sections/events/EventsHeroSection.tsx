"use client";

import { Loader, SectionWrapper } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MediaCenterBanner } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn, getImageURL } from "@/lib/utils";
import { IconX } from "@tabler/icons-react";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";
import PlayerIcon from "../../../../public/icons/PlayerIcon";
import VideoPlayer from "../VideoPlayer";

export function EventsHeroSection({ className }: { className?: string }) {
  const { data, isLoading, isError } = useSWR("/media/page/cta/show");

  if (isLoading) {
    return <Loader className="h-[630px]" />;
  }

  const serializedData = new MediaCenterBanner(_.head(data?.data?.results));

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
          src={getImageURL(serializedData.image)}
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

          <Drawer>
            <DrawerTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="group h-10 w-fit gap-x-2 rounded-full px-4 text-base sm:h-[55px] sm:px-8 sm:text-lg"
              >
                <PlayerIcon className="h-6 w-6 fill-primary group-hover:fill-base-0" />
                <span>{serializedData.watchVideoBtnTitle}</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[calc(100vh-50px)]">
              <DrawerHeader>
                <DrawerClose className="absolute right-2 top-2">
                  <Button variant="secondary" size="icon" className="h-7 w-7">
                    <IconX size={18} />
                  </Button>
                </DrawerClose>
              </DrawerHeader>
              <div className="flex h-full items-center justify-center bg-black pt-2 sm:pt-4">
                <VideoPlayer
                  className="max-w-[1280px] px-2 sm:px-4"
                  playerHeight="100%"
                  videoUrl={serializedData.watchVideoBtnLink}
                />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </SectionWrapper>
  );
}
