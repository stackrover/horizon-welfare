import { auth } from "@/auth";
import { DonorPackageDetailsPage, Loader } from "@/components";
import { getData } from "@/hooks/get-data";
import { Suspense } from "react";

export default async function DonorSubscribedProjectDetails({
  params,
}: {
  params: { packageId: string };
}) {
  const session = await auth();
  const packageId = params.packageId;

  const userId = session?.user?.id;
  const token = session?.user?.token;

  const dataPromise = getData(
    `/donar/subscription/active/show/${userId}/${packageId}`,
    token,
  );

  // check subscription status
  const checkDonorSubscriptionStatus = await getData(
    `/project/subscription/check/${userId}/${packageId}`,
    token,
  );

  const subscriptionStatus = checkDonorSubscriptionStatus?.results ?? false;

  return (
    <Suspense fallback={<Loader className="h-screen" />}>
      <DonorPackageDetailsPage
        session={session}
        dataPromise={dataPromise}
        projectId={packageId}
        isSubscribed={subscriptionStatus}
      />
    </Suspense>
  );
}