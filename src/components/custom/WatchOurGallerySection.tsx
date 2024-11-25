"use client";

import { SectionWrapper } from "@/components";
import { Gallery } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn } from "@/lib/utils";
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
      hidden={serializedData.status !== "active"}
      className={cn("mt-[100px]", className)}
    >
      <h2 className="mb-10 text-center text-5xl font-extrabold leading-[64px] text-base-400">
        {serializedData.title}
      </h2>
      <div className="grid h-fit w-full grid-cols-12 gap-10 px-10">
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${serializedData.image1}`}
          alt={serializedData.imageTitle1}
          className="col-span-1 h-fit w-full rounded-lg"
          width={450}
          height={200}
          priority
        />
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${serializedData.image2}`}
          alt={serializedData.imageTitle2}
          className="col-span-2 h-fit w-full rounded-lg"
          width={450}
          height={200}
          priority
        />

        <div className="col-span-6 row-span-2 flex items-center">
          <VideoPlayer
            className="h-fit overflow-hidden rounded-xl"
            videoUrl={serializedData.videoLink}
          />
        </div>

        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${serializedData.image3}`}
          alt={serializedData.imageTitle3}
          className="col-span-1 h-fit w-full rounded-lg"
          width={450}
          height={200}
          priority
        />

        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${serializedData.image4}`}
          alt={serializedData.imageTitle4}
          className="col-span-2 h-fit w-full rounded-lg"
          width={450}
          height={200}
          priority
        />

        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${serializedData.image5}`}
          alt={serializedData.imageTitle5}
          className="col-span-2 h-fit w-full rounded-lg"
          width={450}
          height={200}
          priority
        />
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${serializedData.image6}`}
          alt={serializedData.imageTitle6}
          className="col-span-1 h-fit w-full rounded-lg"
          width={450}
          height={200}
          priority
        />
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${serializedData.image7}`}
          alt={serializedData.imageTitle7}
          className="col-span-2 h-fit w-full rounded-lg"
          width={450}
          height={200}
          priority
        />
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${serializedData.image8}`}
          alt={serializedData.imageTitle8}
          className="col-span-1 h-fit w-full rounded-lg"
          width={450}
          height={200}
          priority
        />
      </div>
    </SectionWrapper>
  );
}
