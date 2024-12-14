"use client";

import { AboutUsTeamMemberSection, Loader, SectionWrapper } from "@/components";
import { AboutUsTeamMemberTitle } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn } from "@/lib/utils";
import _ from "lodash";

export function AboutUsTeamSection({ className }: { className?: string }) {
  const { data, isLoading, isError } = useSWR("/about/page/team/title/show");

  if (isLoading) {
    return <Loader className="h-[240px]" />;
  }

  const serializedData = new AboutUsTeamMemberTitle(
    _.head(data?.data?.results),
  );

  return (
    <SectionWrapper
      isLoading={isLoading}
      isError={isError}
      errorClass="h-[240px]"
      loadingClass="h-[240px]"
      hidden={
        serializedData.status !== "active" || data?.data?.results?.length === 0
      }
      className={cn("container mt-[100px] flex flex-col gap-y-8", className)}
    >
      <div className="mx-4 max-w-[640px] md:mx-auto">
        <h1 className="text-center text-3xl font-bold leading-10 text-base-400 sm:leading-[58px] xmd:text-4xl xl:text-5xl">
          {serializedData.title}
        </h1>
        <h4 className="mt-3 text-center text-sm font-normal leading-[25px] text-base-300 sm:mt-6 md:text-base">
          {serializedData.description}
        </h4>
      </div>
      <AboutUsTeamMemberSection />
    </SectionWrapper>
  );
}
