import { CancelSubscriptionCard, SubscriptionCard } from "@/components";

export function DonorPackageDetailsAsideCardSection({
  packageId,
  isSubscribed,
}: {
  packageId: number | string;
  isSubscribed: boolean | undefined | null;
}) {
  return (
    <aside className="sticky top-[128px] flex w-full flex-col gap-y-6 mlg:w-fit mlg:min-w-[380px] xl:min-w-[420px]">
      {isSubscribed ? (
        <CancelSubscriptionCard packageId={packageId} />
      ) : (
        <SubscriptionCard packageId={packageId} subscribed={isSubscribed} />
      )}
    </aside>
  );
}
