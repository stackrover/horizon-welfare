"use client";

import { Loader, SectionWrapper, SpecialNeedCard } from "@/components";
import { WhatWeDoKid } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn } from "@/lib/utils";
import _ from "lodash";

export function WhatWeDoKidSection({ className }: { className?: string }) {
  const { data, isLoading, isError } = useSWR("/what/we/do/page/kid/show");

  if (isLoading) {
    return <Loader className="h-[540px]" />;
  }

  const serializedData = new WhatWeDoKid(_.head(data?.data?.results));

  return (
    <SectionWrapper
      isLoading={isLoading}
      isError={isError}
      errorClass="h-[540px]"
      loadingClass="h-[540px]"
      hidden={
        serializedData.status !== "active" || data?.data?.results?.length === 0
      }
      className={cn(
        "container mt-[100px] rounded-lg bg-gradient-to-r from-primary-light to-primary p-10 2xl:p-[80px]",
        className,
      )}
    >
      <h1 className="text-3xl font-bold text-base-0 xmd:text-4xl xmd:leading-[56px] xl:text-5xl">
        {serializedData.title}
      </h1>
      <div className="mt-[60px] grid gap-x-4 gap-y-6 md:grid-cols-2 mlg:grid-cols-3 lg:gap-y-12">
        <SpecialNeedCard
          iconUrl={serializedData.serviceIcon1}
          title={serializedData.serviceTitle1}
          text={serializedData.serviceDescription1}
        />
        <SpecialNeedCard
          iconUrl={serializedData.serviceIcon2}
          title={serializedData.serviceTitle2}
          text={serializedData.serviceDescription2}
        />
        <SpecialNeedCard
          iconUrl={serializedData.serviceIcon3}
          title={serializedData.serviceTitle3}
          text={serializedData.serviceDescription3}
        />
        <SpecialNeedCard
          iconUrl={serializedData.serviceIcon4}
          title={serializedData.serviceTitle4}
          text={serializedData.serviceDescription4}
        />
        <SpecialNeedCard
          iconUrl={serializedData.serviceIcon5}
          title={serializedData.serviceTitle5}
          text={serializedData.serviceDescription5}
        />
        <SpecialNeedCard
          iconUrl={serializedData.serviceIcon6}
          title={serializedData.serviceTitle6}
          text={serializedData.serviceDescription6}
        />
      </div>
    </SectionWrapper>
  );
}
