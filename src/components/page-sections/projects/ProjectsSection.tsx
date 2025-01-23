"use client";

import { Loader, Project, SectionWrapper } from "@/components";
import { SingleProject } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn } from "@/lib/utils";
import FormWrapper from "../../forms/FormWrapper";

export function ProjectsSection({
  editable = false,
  className,
}: {
  editable?: boolean;
  className?: string;
}) {
  const { data, isLoading, isError, refresh } = useSWR(
    "/project/category/list",
  );

  if (isLoading) {
    return <Loader className="h-[300px]" />;
  }

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
      {data?.data.results?.map((item: SingleProject) => (
        <Project
          key={item.id}
          data={item}
          refresh={refresh}
          editable={editable}
        />
      ))}
    </SectionWrapper>
  );
}
