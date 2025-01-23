"use client";

import { Loader, SectionWrapper } from "@/components";
import { StoryCard } from "@/components/custom/StoryCard";
import { Button } from "@/components/ui/button";
import { SuccessStories } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn } from "@/lib/utils";
import _ from "lodash";

export function SuccessStoriesSection({
  editable = false,
  className,
}: {
  editable?: boolean;
  className?: string;
}) {
  const { data, isLoading, isError } = useSWR(
    "/donate/page/success/story/show",
  );

  if (isLoading) {
    return <Loader className="h-[540px]" />;
  }

  const serializedData = new SuccessStories(_.head(data?.data?.results));

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
        "container mt-[100px] grid gap-2 xmd:grid-cols-2 xl:grid-cols-3",
        className,
      )}
    >
      <div className="flex flex-col gap-y-4 mlg:p-8">
        <Button className="w-fit">{serializedData.title}</Button>
        <h2 className="text-2xl font-semibold leading-[44px] text-base-400 md:text-3xl mlg:text-4xl">
          {serializedData.focusTitle}
        </h2>
        <p className="text-base font-normal leading-6 text-base-300">
          {serializedData.description}
        </p>
      </div>
      <StoryCard
        image={serializedData?.story1?.thumbnail ?? ""}
        title={serializedData?.story1?.title ?? ""}
        subtext={serializedData?.story1?.description ?? ""}
        link={`/blogs/${serializedData?.story1?.slug ?? ""}`}
      />
      <StoryCard
        image={serializedData?.story2?.thumbnail ?? ""}
        title={serializedData?.story2?.title ?? ""}
        subtext={serializedData?.story2?.description ?? ""}
        link={`/blogs/${serializedData?.story2?.slug ?? ""}`}
      />
      <StoryCard
        image={serializedData?.story3?.thumbnail ?? ""}
        title={serializedData?.story3?.title ?? ""}
        subtext={serializedData?.story3?.description ?? ""}
        link={`/blogs/${serializedData?.story3?.slug ?? ""}`}
      />
      <StoryCard
        image={serializedData?.story4?.thumbnail ?? ""}
        title={serializedData?.story4?.title ?? ""}
        subtext={serializedData?.story4?.description ?? ""}
        link={`/blogs/${serializedData?.story4?.slug ?? ""}`}
      />
      <StoryCard
        image={serializedData?.story5?.thumbnail ?? ""}
        title={serializedData?.story5?.title ?? ""}
        subtext={serializedData?.story5?.description ?? ""}
        link={`/blogs/${serializedData?.story5?.slug ?? ""}`}
      />
    </SectionWrapper>
  );
}
