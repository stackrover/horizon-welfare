"use client";

import { Loader } from "@/components";
import { SectionWrapper } from "@/components/custom/SectionWrapper";
import { WhatWeDoHero } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn } from "@/lib/utils";
import _ from "lodash";
import Image from "next/image";

export function WhatWeDoHeroSection({ className }: { className?: string }) {
  const { data, isLoading, isError } = useSWR("/what/we/do/page/hero/show");

  if (isLoading) {
    return <Loader className="h-[540px]" />;
  }

  const serializedData = new WhatWeDoHero(_.head(data?.data?.results));

  return (
    <SectionWrapper
      isLoading={isLoading}
      isError={isError}
      errorClass="h-[540px]"
      loadingClass="h-[540px]"
      hidden={serializedData.status !== "active"}
      className={cn("mx-auto mt-[150px] grid max-w-7xl grid-cols-2", className)}
    >
      <div className="flex max-w-xl flex-col justify-center gap-y-6">
        <h5 className="text-base font-bold leading-[18px] text-base-400">
          {serializedData.title}
        </h5>
        <h1 className="text-[56px] font-bold leading-[68px] text-base-400">
          {serializedData.focusTitle}
        </h1>
        <h5 className="text-base font-normal leading-6 text-base-300">
          {serializedData.description}
        </h5>
      </div>
      <div className="flex justify-end">
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}${serializedData.image}`}
          alt="What We Do"
          height={384}
          width={476}
          priority
        />
      </div>
    </SectionWrapper>
  );
}
