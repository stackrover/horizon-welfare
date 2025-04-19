"use client";

import { Loader, SectionWrapper, TeamMemberCard } from "@/components";
import { TeamMember } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn } from "@/lib/utils";

export function AboutUsTeamMemberSection({
  className,
}: {
  className?: string;
}) {
  const { data, isLoading, isError } = useSWR("/about/page/team/member/list");

  if (isLoading) {
    return <Loader className="h-[655px]" />;
  }

  const serializedData =
    data?.data?.results?.length > 0
      ? data?.data?.results?.map(
          (item: Record<string, unknown>) => new TeamMember(item),
        )
      : [];

  return (
    <SectionWrapper
      isLoading={isLoading}
      isError={isError}
      errorClass="h-[655px]"
      loadingClass="h-[655px]"
      hidden={data?.data?.results?.length === 0}
      className={cn(
        "grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 xmd:grid-cols-3 lg:grid-cols-4",
        className,
      )}
    >
      {serializedData.length > 0
        ? serializedData.map((item: TeamMember) => (
            <TeamMemberCard key={item.id} item={item} />
          ))
        : null}
    </SectionWrapper>
  );
}
