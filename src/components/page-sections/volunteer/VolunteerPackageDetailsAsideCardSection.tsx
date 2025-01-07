import { VolunteerCard, VolunteerWithdrawCard } from "@/components";
import { VolunteerProjectDetailsData } from "@/data";

export function VolunteerPackageDetailsAsideCardSection({
  isSubscribed,
  detailsData,
}: {
  isSubscribed: boolean | undefined | null;
  detailsData: VolunteerProjectDetailsData;
}) {
  return (
    <aside className="sticky top-[128px] flex w-full flex-col gap-y-6 mlg:w-fit mlg:min-w-[380px] xl:min-w-[420px]">
      {isSubscribed ? (
        <VolunteerWithdrawCard projectId={detailsData.projectId} />
      ) : (
        <VolunteerCard detailsData={detailsData} subscribed={isSubscribed} />
      )}
    </aside>
  );
}
