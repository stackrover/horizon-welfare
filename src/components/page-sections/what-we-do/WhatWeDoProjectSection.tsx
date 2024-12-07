"use client";

import { Loader, ProjectCard, SectionWrapper } from "@/components";
import { WhatWeDoProject } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn } from "@/lib/utils";
import _ from "lodash";

export function WhatWeDoProjectSection({ className }: { className?: string }) {
  const { data, isLoading, isError } = useSWR(
    "/what/we/do/page/project/title/show",
  );

  if (isLoading) {
    return <Loader className="h-[540px]" />;
  }

  const serializedData = new WhatWeDoProject(_.head(data?.data?.results));

  console.log(serializedData);

  return (
    <SectionWrapper
      isLoading={isLoading}
      isError={isError}
      errorClass="h-[540px]"
      loadingClass="h-[540px]"
      hidden={serializedData.status !== "active"}
      className={cn(
        "mx-auto mt-[80px] flex max-w-7xl flex-col gap-y-16",
        className,
      )}
    >
      <div className="max-w-2xl">
        <h4 className="text-base font-bold leading-[18px] text-base-400">
          {serializedData.title}
        </h4>
        <h1 className="mt-6 text-5xl font-bold leading-[58px] text-base-400">
          {serializedData.focusTitle}
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-x-5 gap-y-6">
        <ProjectCard
          className="bg-[url(/images/project-done1.png)]"
          title="Mission smile 1k: Outdoor charity"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
          path="/"
        />
        <ProjectCard
          className="bg-[url(/images/project-done2.png)]"
          title="Weekly excursions"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
          path="/"
        />
        <ProjectCard
          className="bg-[url(/images/project-done3.png)]"
          title="Monthly public awareness"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
          path="/"
        />
        <ProjectCard
          className="bg-[url(/images/project-done1.png)]"
          title="Mission smile 1k: Outdoor charity"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
          path="/"
        />
        <ProjectCard
          className="bg-[url(/images/project-done2.png)]"
          title="Weekly excursions"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
          path="/"
        />
        <ProjectCard
          className="bg-[url(/images/project-done3.png)]"
          title="Monthly public awareness"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
          path="/"
        />
      </div>
    </SectionWrapper>
  );
}
