"use client";

import { DonationCard, Loader, SectionWrapper } from "@/components";
import { ProjectData2 } from "@/data";
import { useSWR } from "@/hooks/use-swr";

export function NgoProjectSection() {
  const { data, isLoading, isError } = useSWR("/project/list/top");

  if (isLoading) {
    return <Loader className="h-[540px]" />;
  }

  const serializedData =
    data?.data?.results?.length > 0
      ? data?.data.results.map((d: any) => new ProjectData2(d))
      : [];

  return (
    <SectionWrapper
      isLoading={isLoading}
      isError={isError}
      errorClass="h-[540px]"
      loadingClass="h-[540px]"
      className='className="container 3xl:py-16" rounded-3xl px-4 py-4 shadow-[2px_9px_42px_rgb(0,0,0,0.08)] xmd:px-8 xmd:py-8 3xl:rounded-[40px] 3xl:px-12'
    >
      <h1 className="mb-4 text-xl font-extrabold leading-9 text-base-400 md:text-2xl xmd:mb-8 xmd:leading-10 lg:text-3xl lg:leading-[50px] xl:text-4xl 2xl:text-5xl">
        MEET SOME OF OUR TOP <span className="text-primary">NGO</span> <br />{" "}
        PROJECTS
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xmd:gap-6 xl:grid-cols-3">
        {serializedData?.length > 0
          ? serializedData.map((project: ProjectData2) => (
              <DonationCard key={project.id} cardData={project} />
            ))
          : null}
      </div>
    </SectionWrapper>
  );
}
