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
      // hidden={serializedData.status !== "active"}
      className={cn("mx-auto mt-[100px] max-w-6xl", className)}
    >
      <h1 className="text-center text-5xl font-bold leading-[58px] text-base-400">
        Awards & Recognitions
      </h1>
      <div className="mt-[60px] grid grid-cols-4">
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
