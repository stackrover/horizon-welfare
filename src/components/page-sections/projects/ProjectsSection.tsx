"use client";

import { Loader, Project, SectionWrapper } from "@/components";
import { SingleProject } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn } from "@/lib/utils";

export function ProjectsSection({ className }: { className?: string }) {
  const { data, isLoading, isError } = useSWR("/project/category/list");

  if (isLoading) {
    return <Loader className="h-[300px]" />;
  }

  const serializedData =
    data?.data?.results?.length > 0
      ? data?.data.results.map((item: SingleProject) => new SingleProject(item))
      : [];

  return (
    <SectionWrapper
      isLoading={isLoading}
      isError={isError}
      errorClass="h-[300px]"
      loadingClass="h-[300px]"
      className={cn(
        "container mt-[100px] grid gap-6 xmd:grid-cols-2 lg:grid-cols-3",
        className,
      )}
      hidden={data?.data?.results?.length === 0}
    >
      {serializedData?.length > 0
        ? serializedData.map((item: SingleProject) => (
            <Project
              key={item.id}
              title={item.title}
              icon={item.icon}
              link={`/projects/category/${item.id}`}
            />
          ))
        : null}
    </SectionWrapper>
  );
}
