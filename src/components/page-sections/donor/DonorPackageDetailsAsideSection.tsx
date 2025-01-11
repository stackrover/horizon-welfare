import { CancelSubscriptionCard, SubscriptionCard } from "@/components";
import { DonorAvailableProject, DonorSubscribedProject } from "@/data";

export function DonorPackageDetailsAsideCardSection({
  serializedData,
  isSubscribed,
}: {
  serializedData: DonorSubscribedProject | DonorAvailableProject;
  isSubscribed: boolean | undefined | null;
}) {
  return (
    <aside className="sticky top-[128px] flex w-full flex-col gap-y-6 mlg:w-fit mlg:min-w-[380px] xl:min-w-[420px]">
      {isSubscribed ? (
        <>
          <SubscriptionCard
            serializedData={serializedData}
            subscribed={isSubscribed}
          />
          <CancelSubscriptionCard packageId={serializedData.packageId} />
        </>
      ) : (
        <SubscriptionCard
          serializedData={serializedData}
          subscribed={isSubscribed}
        />
      )}
    </aside>
  );
}
