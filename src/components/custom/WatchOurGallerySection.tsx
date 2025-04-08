"use client";

import { SectionWrapper } from "@/components";
import { Gallery } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn, getImageURL } from "@/lib/utils";
import _ from "lodash";
import Image from "next/image";
import VideoPlayer from "../page-sections/VideoPlayer";

export function WatchOurGallerySection({ className }: { className?: string }) {
  const { data, isLoading, isError } = useSWR("/home/gallery");

  const serializedData = new Gallery(_.head(data?.data?.results));

  return (
    <SectionWrapper
      isError={isError}
      isLoading={isLoading}
      errorClass="h-[750px]"
      loadingClass="h-[750px]"
      hidden={
        serializedData.status !== "active" || data?.data?.results?.length === 0
      }
      className={cn("mt-[100px]", className)}
    >
      <h2 className="mb-10 text-center text-2xl font-extrabold leading-10 text-base-400 xmd:text-3xl xmd:leading-[64px] xl:text-4xl 2xl:text-5xl">
        {serializedData.title}
      </h2>
      <div className="grid h-fit w-full grid-cols-12 items-center justify-center gap-4 px-4 md:px-10">
        <div className="col-span-12 grid grid-cols-2 gap-4 3xl:col-span-4">
          <Image
            src={getImageURL(serializedData.image1)}
            alt={serializedData.imageTitle1}
            className="h-fit w-full rounded-lg"
            width={450}
            height={200}
            loading="lazy"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Vg8AAnEBdzTCX3oAAAAASUVORK5CYII="
            placeholder="blur"
          />
          <Image
            src={getImageURL(serializedData.image2)}
            alt={serializedData.imageTitle2}
            className="h-fit w-full rounded-lg"
            width={450}
            height={200}
            loading="lazy"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Vg8AAnEBdzTCX3oAAAAASUVORK5CYII="
            placeholder="blur"
          />
          <Image
            src={getImageURL(serializedData.image3)}
            alt={serializedData.imageTitle3}
            className="h-fit w-full rounded-lg"
            width={450}
            height={200}
            loading="lazy"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Vg8AAnEBdzTCX3oAAAAASUVORK5CYII="
            placeholder="blur"
          />

          <Image
            src={getImageURL(serializedData.image4)}
            alt={serializedData.imageTitle4}
            className="h-fit w-full rounded-lg"
            width={450}
            height={200}
            loading="lazy"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Vg8AAnEBdzTCX3oAAAAASUVORK5CYII="
            placeholder="blur"
          />
        </div>

        <div className="col-span-12 row-span-2 flex items-center 3xl:col-span-4">
          <VideoPlayer
            className="h-fit overflow-hidden rounded-xl"
            videoUrl={serializedData.videoLink}
            playerHeight="448px"
          />
        </div>

        <div className="col-span-12 grid grid-cols-2 gap-4 3xl:col-span-4">
          <Image
            src={getImageURL(serializedData.image5)}
            alt={serializedData.imageTitle5}
            className="h-fit w-full rounded-lg"
            width={450}
            height={200}
            loading="lazy"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Vg8AAnEBdzTCX3oAAAAASUVORK5CYII="
            placeholder="blur"
          />
          <Image
            src={getImageURL(serializedData.image6)}
            alt={serializedData.imageTitle6}
            className="h-fit w-full rounded-lg"
            width={450}
            height={200}
            loading="lazy"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Vg8AAnEBdzTCX3oAAAAASUVORK5CYII="
            placeholder="blur"
          />
          <Image
            src={getImageURL(serializedData.image7)}
            alt={serializedData.imageTitle7}
            className="h-fit w-full rounded-lg"
            width={450}
            height={200}
            loading="lazy"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Vg8AAnEBdzTCX3oAAAAASUVORK5CYII="
            placeholder="blur"
          />
          <Image
            src={getImageURL(serializedData.image8)}
            alt={serializedData.imageTitle8}
            className="h-fit w-full rounded-lg"
            width={450}
            height={200}
            loading="lazy"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Vg8AAnEBdzTCX3oAAAAASUVORK5CYII="
            placeholder="blur"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
