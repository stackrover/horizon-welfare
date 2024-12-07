"use client";

import { Loader, SectionWrapper } from "@/components";
import { AboutUsContent } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn } from "@/lib/utils";
import _ from "lodash";
import dynamic from "next/dynamic";

const VideoPlayer = dynamic(
  () => import("@/components/page-sections/VideoPlayer"),
  { ssr: false },
);

export function AboutUsContentSection({ className }: { className?: string }) {
  const { data, isLoading, isError } = useSWR("/about/page/content/show");

  if (isLoading) {
    return <Loader className="h-[800px]" />;
  }

  const serializedData = new AboutUsContent(_.head(data?.data?.results));

  return (
    <SectionWrapper
      isLoading={isLoading}
      isError={isError}
      errorClass="h-[800px]"
      loadingClass="h-[800px]"
      hidden={serializedData.status !== "active"}
      className={cn("relative", className)}
    >
      {/* know about us section  */}
      <section className="mx-auto mt-[150px] max-w-7xl py-4">
        <h5 className="mb-6 text-base font-bold leading-[18px] text-base-400">
          {serializedData.title}
        </h5>
        <div className="grid grid-cols-12 items-start">
          <h1 className="col-span-8 text-[56px] font-bold leading-[68px] text-base-400">
            {serializedData.focusTitle}
          </h1>
          <div className="col-span-4">
            <h3 className="text-xl font-bold leading-[30px] text-base-400">
              {serializedData.descriptionTitle}
            </h3>
            <h5 className="text-base font-normal leading-6 text-base-300">
              {serializedData.description}
            </h5>
          </div>
        </div>
      </section>

      {/* our mission section  */}
      <section className="container">
        <div className="translate-y-[225px]">
          <VideoPlayer
            className="h-fit overflow-hidden rounded-xl"
            videoUrl={serializedData.videoLink}
            playerHeight="448px"
          />
        </div>

        <div className="rounded-lg border bg-gradient-to-r from-primary-light to-primary">
          <div className="z-0 mx-auto mb-[80px] mt-[300px] grid max-w-6xl grid-cols-2 gap-x-8">
            <div className="flex flex-col gap-y-4">
              <h4 className="text-base font-bold uppercase leading-5 text-base-0">
                {serializedData.missionTitle}
              </h4>
              <h2 className="text-[28px] font-bold leading-[42px] text-base-0">
                {serializedData.missionFocusTitle}
              </h2>
              <h5 className="text-base font-normal leading-6 text-base-0">
                {serializedData.missionDescription}
              </h5>
            </div>
            <div className="flex flex-col gap-y-4">
              <h4 className="text-base font-bold uppercase leading-5 text-base-0">
                {serializedData.visionTitle}
              </h4>
              <h2 className="text-[28px] font-bold leading-[42px] text-base-0">
                {serializedData.visionFocusTitle}
              </h2>
              <h5 className="text-base font-normal leading-6 text-base-0">
                {serializedData.visionDescription}
              </h5>
            </div>
          </div>
        </div>
      </section>
      {/* our mission section end  */}
    </SectionWrapper>
  );
}
