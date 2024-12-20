"use client";

import { Event, Loader, SectionWrapper } from "@/components";
import { EventData } from "@/data";
import { useSWR } from "@/hooks/use-swr";

export function Events() {
  const { data, isLoading, isError } = useSWR(`/event/list`);

  if (isLoading) {
    return <Loader className="h-[600px]" />;
  }

  const serializedData =
    data?.data?.results?.length > 0
      ? data?.data.results.map((item: any) => new EventData(item))
      : [];

  console.log(serializedData);

  return (
    <SectionWrapper
      isLoading={isLoading}
      isError={isError}
      errorClass="h-[655px]"
      loadingClass="h-[655px]"
      hidden={data?.data?.results?.length === 0}
      className="container mt-20"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mlg:grid-cols-3 2xl:grid-cols-4 2xl:gap-6">
        {serializedData.length > 0
          ? serializedData.map((item: EventData) => (
              <Event
                key={item.id}
                image={item.thumbnail}
                title={item.title}
                date={item.scheduleDate + " " + item.scheduleTime}
                description={item.location}
                id={item.id}
              />
            ))
          : null}
      </div>
    </SectionWrapper>
  );
}
