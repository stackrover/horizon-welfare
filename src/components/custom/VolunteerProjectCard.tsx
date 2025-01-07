"use client";

import { VolunteerCardData } from "@/data/volunteer/volunteer.-card-data";
import { useSWR } from "@/hooks/use-swr";
import { usePathname } from "next/navigation";
import { ProjectCard } from "./ProjectCard";
import { SectionWrapper } from "./SectionWrapper";

export function VolunteerProjectCard({
  endpoint,
  title,
}: {
  endpoint: string;
  title: string;
}) {
  const { data, isLoading, isError } = useSWR(endpoint);
  const pathname = usePathname();

  const serializedData = data?.data?.results
    ? data.data.results.map(
        (item: Record<string, unknown>) => new VolunteerCardData(item),
      )
    : [];

  return (
    <SectionWrapper
      isError={isError}
      isLoading={isLoading}
      errorClass="h-[220px]"
      loadingClass="h-[220px]"
      hidden={data?.data?.results?.length === 0}
      className="container mx-auto mt-[80px] flex flex-col gap-y-16"
    >
      <h1 className="mt-6 text-5xl font-bold leading-[58px] text-base-400">
        {title}
      </h1>

      <div className="grid gap-x-5 gap-y-6 md:grid-cols-2 mlg:grid-cols-3">
        {serializedData.length > 0
          ? serializedData.map((project: VolunteerCardData) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                path={`${pathname}/${project.id}`}
                thumbnail={
                  process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL + project.thumbnail
                }
              />
            ))
          : null}
      </div>
    </SectionWrapper>
  );
}
