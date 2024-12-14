"use client";

import { Loader, OurJourneySummary, SectionWrapper } from "@/components";
import { AboutUsJourney } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn } from "@/lib/utils";
import _ from "lodash";
import Image from "next/image";

export function AboutUsJourneySection({ className }: { className?: string }) {
  const { data, isLoading, isError } = useSWR("/about/page/journey/show");

  if (isLoading) {
    return <Loader className="h-[655px]" />;
  }

  const serializedData = new AboutUsJourney(_.head(data?.data?.results));

  return (
    <SectionWrapper
      isLoading={isLoading}
      isError={isError}
      errorClass="h-[655px]"
      loadingClass="h-[655px]"
      hidden={
        serializedData.status !== "active" || data?.data?.results?.length === 0
      }
      className={cn(
        "container mt-[100px] grid grid-cols-12 gap-x-0 gap-y-8 rounded-[20px] bg-primary px-6 py-6 mlg:gap-x-4 mlg:gap-y-0 xl:px-8 xl:py-8 2xl:py-16",
        className,
      )}
    >
      <div className="order-2 col-span-12 flex flex-col justify-center gap-y-4 mlg:order-1 mlg:col-span-6 2xl:ml-12">
        <h4 className="text-base font-bold leading-5 text-base-0">
          {serializedData.title}
        </h4>
        <h1 className="text-4xl font-bold leading-[58px] text-base-0 2xl:text-5xl">
          {serializedData.focusTitle}
        </h1>
        <p className="text-base font-normal leading-6 text-base-200">
          {serializedData.description}
        </p>
        <div className="mt-4 flex gap-x-8">
          <OurJourneySummary
            count={serializedData.donationCount}
            text={serializedData.donationTitle}
          />
          <OurJourneySummary
            count={serializedData.volunteerCount}
            text={serializedData.volunteerTitle}
          />
          <OurJourneySummary
            count={serializedData.homeCount}
            text={serializedData.homeTitle}
          />
        </div>
      </div>
      <Image
        src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${serializedData.image}`}
        alt="Money-raising"
        height={350}
        width={612}
        className="order-1 col-span-12 h-fit w-fit sm:w-full mlg:order-2 mlg:col-span-6"
      />
    </SectionWrapper>
  );
}
