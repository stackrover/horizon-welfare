import {
  CancelSubscriptionCard,
  Donation,
  RecentContributionCard,
  SubscriptionCard,
  VolunteerCard,
  VolunteerWithdrawCard,
} from "@/components";
import { Project } from "@/data";

export function ProjectAsideCardSection({
  serializedData,
  session,
  isSubscribed,
}: {
  serializedData: Project;
  session: any;
  isSubscribed: boolean | undefined | null;
}) {
  return (
    <aside className="sticky top-[128px] flex w-full flex-col gap-y-6 mlg:w-fit mlg:min-w-[380px] xl:min-w-[420px]">
      {session?.user?.role === "donor" ? (
        <>
          <SubscriptionCard subscribed={isSubscribed} />
          {isSubscribed ? <CancelSubscriptionCard /> : null}
        </>
      ) : session?.user?.role === "volunteer" ? (
        <>
          <VolunteerCard subscribed={isSubscribed} />
          {isSubscribed ? <VolunteerWithdrawCard /> : null}
        </>
      ) : (
        <>
          <Donation serializedData={serializedData} />
          <RecentContributionCard
            recentContributions={serializedData?.lastThreeDonations}
          />
        </>
      )}
    </aside>
  );
}
