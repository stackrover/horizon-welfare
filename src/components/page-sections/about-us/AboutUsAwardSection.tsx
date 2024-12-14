"use client";

import { Loader, SectionWrapper } from "@/components";
import { AwardCard } from "@/components/custom/AwardCard";
import { AwardSection } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn } from "@/lib/utils";

export function AboutUsAwardSection({ className }: { className?: string }) {
  const { data, isLoading, isError } = useSWR("/about/page/award/list");

  if (isLoading) {
    return <Loader className="h-[400px]" />;
  }

  const serializedData =
    data?.data?.results?.length > 0
      ? data?.data?.results?.map(
          (item: Record<string, unknown>) => new AwardSection(item),
        )
      : [];

  return (
    <SectionWrapper
      isLoading={isLoading}
      isError={isError}
      errorClass="h-[400px]"
      loadingClass="h-[400px]"
      hidden={data?.data?.results?.length === 0}
      className={cn("mx-4 mt-[100px] max-w-7xl 2xl:mx-auto", className)}
    >
      <h1 className="text-center text-2xl font-bold leading-[58px] text-base-400 sm:text-3xl xmd:text-4xl xl:text-5xl">
        Awards & Recognitions
      </h1>
      <div className="mt-[60px] grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 xmd:grid-cols-4">
        {serializedData?.length > 0
          ? serializedData.map((item: any) => (
              <AwardCard
                key={item?.id}
                imageUrl={item?.logo}
                year={item?.year}
                name={item?.title}
                place={item?.venue}
              />
            ))
          : null}
      </div>
    </SectionWrapper>
  );
}
