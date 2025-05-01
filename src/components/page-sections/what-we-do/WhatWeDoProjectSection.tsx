"use client";

import { Loader, ProjectCard, SectionWrapper } from "@/components";
import { ProjectData, WhatWeDoProject } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn, getImageURL } from "@/lib/utils";
import _ from "lodash";

export function WhatWeDoProjectSection({ className }: { className?: string }) {
  const { data, isLoading, isError } = useSWR(
    "/what/we/do/page/project/title/show",
  );
  const {
    data: completedProjects,
    isLoading: projectLoading,
    isError: projectError,
  } = useSWR("/project/list/completed");

  if (isLoading || projectLoading) {
    return <Loader className="h-[540px]" />;
  }

  const serializedData = new WhatWeDoProject(_.head(data?.data?.results));
  const projectData =
    completedProjects?.data?.results?.length > 0
      ? completedProjects?.data.results.map((d: any) => new ProjectData(d))
      : [];

  return (
    <SectionWrapper
      isLoading={isLoading || projectLoading}
      isError={isError || projectError}
      errorClass="h-[540px]"
      loadingClass="h-[540px]"
      hidden={
        serializedData.status !== "active" || data?.data?.results?.length === 0
      }
      className={cn(
        "mx-auto mt-[80px] flex max-w-7xl flex-col gap-y-10 px-4 xmd:gap-y-16",
        className,
      )}
    >
      <div className="max-w-2xl">
        <h4 className="text-base font-bold leading-[18px] text-base-400">
          {serializedData.title}
        </h4>
        <h1 className="mt-6 text-3xl font-bold text-base-400 xmd:text-4xl xl:text-5xl xl:leading-[56px]">
          {serializedData.focusTitle}
        </h1>
      </div>
      <div className="grid gap-x-5 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
        {projectData?.length > 0
          ? projectData.map((project: ProjectData) => (
              <ProjectCard
                key={project.id}
                thumbnail={getImageURL(project.thumbnail)}
                title={project.title}
                description={project.description}
                path={`/projects/details/${project.id}`}
              />
            ))
          : null}
      </div>
    </SectionWrapper>
  );
}
