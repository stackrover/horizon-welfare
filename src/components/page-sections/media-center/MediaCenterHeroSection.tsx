"use client";

import { Loader, NewsCard, SectionWrapper } from "@/components";
import { Button } from "@/components/ui/button";
import { MediaCenterHero } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import _ from "lodash";

export function MediaCenterHeroSection({ className }: { className?: string }) {
  const { data, isLoading, isError } = useSWR("/media/page/hero/show");

  if (isLoading) {
    return <Loader className="h-[800px]" />;
  }

  const serializedData = new MediaCenterHero(_.head(data?.data?.results));

  return (
    <SectionWrapper
      isLoading={isLoading}
      isError={isError}
      errorClass="h-[800px]"
      loadingClass="h-[800px]"
      hidden={data?.data?.results?.length === 0}
      className={cn("bg-[#CEF4FF] px-4 py-[80px]", className)}
    >
      <div className="mx-auto grid max-w-7xl gap-4 mlg:grid-cols-2">
        <div>
          <h4 className="mb-3 text-base font-bold leading-[18px] text-base-400 xmd:mb-6">
            {serializedData.title}
          </h4>
          <h1 className="mb-6 text-3xl font-bold text-base-400 xmd:mb-10 mlg:text-5xl mlg:leading-[68px] 2xl:text-[56px]">
            {serializedData.focusTitle}
          </h1>
          <p className="mb-4 text-base leading-[26px] text-base-300">
            {serializedData.description}
          </p>
          <Button className="rounded-sm">Read More</Button>
        </div>
        <div className="flex flex-col gap-y-6 rounded-[20px] bg-base-0 p-6">
          <NewsCard
            title={serializedData.news1.title}
            date={format(
              new Date(serializedData.news1.createdAt),
              "dd'th' MMM yyyy",
            )}
            description={serializedData.news1.description}
            image={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}${serializedData.news1.thumbnail}`}
          />
          <NewsCard
            title={serializedData.news2.title}
            date={format(
              new Date(serializedData.news2.createdAt),
              "dd'th' MMM yyyy",
            )}
            description={serializedData.news2.description}
            image={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}${serializedData.news2.thumbnail}`}
          />
          <NewsCard
            title={serializedData.news3.title}
            date={format(
              new Date(serializedData.news3.createdAt),
              "dd'th' MMM yyyy",
            )}
            description={serializedData.news3.description}
            image={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}${serializedData.news3.thumbnail}`}
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
