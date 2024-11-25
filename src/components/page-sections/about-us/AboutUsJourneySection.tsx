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
      hidden={serializedData.status !== "active"}
      className={cn(
        "container mt-[100px] grid grid-cols-12 gap-x-4 rounded-[20px] bg-primary px-8 py-16",
        className,
      )}
    >
      <div className="col-span-6 ml-12 flex flex-col justify-center gap-y-4">
        <h4 className="text-base font-bold leading-5 text-base-0">
          {serializedData.title}
        </h4>
        <h1 className="text-5xl font-bold leading-[58px] text-base-0">
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
        height={448}
        width={612}
        className="col-span-6 w-full"
      />
    </SectionWrapper>
  );
}
