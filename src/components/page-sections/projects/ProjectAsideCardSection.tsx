import { Donation, RecentContributionCard } from "@/components";
import { Project } from "@/data";

export function ProjectAsideCardSection({
  serializedData,
  session,
}: {
  serializedData: Project;
  session: any;
}) {
  return (
    <aside className="sticky top-[128px] flex w-full flex-col gap-y-6 mlg:w-fit mlg:min-w-[380px] xl:min-w-[420px]">
      <Donation serializedData={serializedData} />
      <RecentContributionCard
        recentContributions={serializedData?.lastThreeDonations}
      />
    </aside>
  );
}
