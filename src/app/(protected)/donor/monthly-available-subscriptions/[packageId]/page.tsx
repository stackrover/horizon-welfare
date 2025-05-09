import { auth } from "@/auth";
import { DonorAvailablePackageDetailsPage, Loader } from "@/components";
import { getData } from "@/hooks/get-data";
import { config } from "@/utils/config";
import { Suspense } from "react";

export default async function DonorAvailableProjectDetails({
  params,
}: {
  params: { packageId: string };
}) {
  const session = await auth();
  const packageId = params.packageId;

  const userId = session?.user?.id;
  const token = session?.user?.token;

  const dataPromise = getData(
    `/donar/subscription/available/show/${userId}/${packageId}`,
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
      <DonorAvailablePackageDetailsPage
        session={session}
        dataPromise={dataPromise}
        projectId={packageId}
        isSubscribed={subscriptionStatus}
      />
    </Suspense>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { packageId: string };
}) {
  const packageId = params.packageId;
  const session = await auth();
  const token = session?.user?.token;

  const data = await getData(
    `/donar/subscription/available/show/${session?.user?.id}/${packageId}`,
    token,
  );

  return {
    title: `${data?.results?.title} - ${config.get("app.name")}`,
    description: data?.results?.description,
  };
}
