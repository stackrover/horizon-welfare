"use client";

import { SectionWrapper } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { VideoGalleryHero } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn } from "@/lib/utils";
import { IconX } from "@tabler/icons-react";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";
import PlayerIcon from "../../../../public/icons/PlayerIcon";
import VideoPlayer from "../VideoPlayer";

export function VideoGalleryHeroSection({ className }: { className?: string }) {
  const { data, isLoading, isError } = useSWR("/video/page/hero/show");

  const serializedData = new VideoGalleryHero(_.head(data?.data?.results));

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
          <Link href={serializedData.donateBtnLink}>
            <Button
              type="button"
              className="h-[55px] rounded-full px-8 text-lg"
            >
              {serializedData.donateBtnTitle}
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
                <span>{serializedData.videoBtnTitle}</span>
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
                  videoUrl={serializedData.videoBtnLink}
                />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </SectionWrapper>
  );
}
