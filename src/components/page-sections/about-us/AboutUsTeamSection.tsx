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
      hidden={serializedData.status !== "active"}
      className={cn("container mt-[100px] flex flex-col gap-y-8", className)}
    >
      <div className="mx-auto max-w-xl">
        <h1 className="text-center text-5xl font-bold leading-[58px] text-base-400">
          {serializedData.title}
        </h1>
        <h4 className="mt-6 text-center text-base font-normal leading-[25px] text-base-300">
          {serializedData.description}
        </h4>
      </div>
      <AboutUsTeamMemberSection />
    </SectionWrapper>
  );
}
