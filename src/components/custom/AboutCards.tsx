"use client";

import { AboutCard, SectionWrapper } from "@/components";
import { Services } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn } from "@/lib/utils";
import _ from "lodash";

export function AboutCards({ className }: { className?: string }) {
  const { data, isLoading, isError } = useSWR("/home/service");

  const serializedData = new Services(_.head(data?.data?.results));

  return (
    <SectionWrapper
      isLoading={isLoading}
      isError={isError}
      errorClass="h-[630px]"
      loadingClass="h-[630px]"
      hidden={
        serializedData.status !== "active" || data?.data?.results?.length === 0
      }
      className={cn(
        "container grid grid-cols-1 gap-8 pt-[100px] mlg:grid-cols-2",
        className,
      )}
    >
      <AboutCard
        imageUrl={serializedData.image1}
        title={serializedData.title1}
        desc={serializedData.description1}
      />
      <AboutCard
        imageUrl={serializedData.image2}
        title={serializedData.title2}
        desc={serializedData.description2}
      />
      <AboutCard
        imageUrl={serializedData.image3}
        title={serializedData.title3}
        desc={serializedData.description3}
      />
      <AboutCard
        imageUrl={serializedData.image4}
        title={serializedData.title4}
        desc={serializedData.description4}
      />
    </SectionWrapper>
  );
}
