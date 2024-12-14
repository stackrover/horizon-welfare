"use client";

import { Loader, SectionWrapper } from "@/components";
import { Video } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import dynamic from "next/dynamic";

const VideoCard = dynamic(
  () => import("@/components/custom/VideoCard").then((mod) => mod.VideoCard),
  {
    ssr: false,
  },
);

export function VideoGalleryCardsSection() {
  const { data, isLoading, isError } = useSWR("/video/page/video/list");

  if (isLoading) {
    return <Loader className="h-screen" />;
  }

  const serializedData =
    data?.data?.results?.length > 0
      ? data?.data.results.map((item: Video) => new Video(item))
      : [];

  return (
    <SectionWrapper
      isLoading={isLoading}
      isError={isError}
      errorClass="h-screen"
      loadingClass="h-screen"
      className="container mt-[60px] grid grid-cols-4 gap-x-6 gap-y-8"
      hidden={data?.data?.results?.length === 0}
    >
      {serializedData.length > 0
        ? serializedData.map((video: Video) => (
            <VideoCard
              key={video.id}
              videoUrl={video.youtubeLink}
              title={video.title}
            />
          ))
        : null}
    </SectionWrapper>
  );
}
