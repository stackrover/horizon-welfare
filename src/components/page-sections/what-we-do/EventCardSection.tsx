"use client";

import { Loader, SectionWrapper } from "@/components";
import { EventCard } from "@/components/custom/EventCard";
import { Separator } from "@/components/ui/separator";
import { WhatWeDoEventCard } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export function EventCardSection({ className }: { className?: string }) {
  const { data, isLoading, isError } = useSWR("/event/subscriber/list");

  if (isLoading) {
    return <Loader className="h-[655px]" />;
  }

  const serializedData =
    data?.data?.results?.length > 0
      ? data?.data?.results?.map(
          (item: Record<string, unknown>) => new WhatWeDoEventCard(item),
        )
      : [];

  return (
    <SectionWrapper
      isLoading={isLoading}
      isError={isError}
      errorClass="h-[655px]"
      loadingClass="h-[655px]"
      hidden={data?.data?.results?.length === 0}
      className={cn("mx-auto mt-[100px] max-w-7xl px-4", className)}
    >
      <div className="flex items-center gap-x-5">
        <h2 className="mb-1 whitespace-nowrap text-3xl font-medium text-base-400 md:text-4xl lg:text-[40px] lg:leading-[56px]">
          Our Events
        </h2>
        <Separator className="shrink" />
      </div>
      <div className="mt-10 grid gap-5 mlg:grid-cols-2">
        {serializedData.length > 0
          ? serializedData.map((item: WhatWeDoEventCard) => (
              <EventCard
                key={item.id}
                day={format(new Date(item.createdAt), "dd")}
                month={format(new Date(item.createdAt), "MMM")}
                title={item.firstName + item.lastName}
                url={`/events/${item.id}`}
              />
            ))
          : null}
      </div>
    </SectionWrapper>
  );
}
