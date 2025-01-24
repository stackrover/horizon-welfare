import { auth } from "@/auth";
import { Loader, VolunteerProjectDetails } from "@/components";
import { getData } from "@/hooks/get-data";
import { config } from "@/utils/config";
import { Suspense } from "react";

export default async function AvailableProjectDetailsPage({
  params,
}: {
  params: { projectId: string };
}) {
  const session = await auth();
  const projectId = params.projectId;

  const userId = session?.user?.id;
  const token = session?.user?.token;

  const dataPromise = getData(`/volunteer/project/show/${projectId}`, token);

  console.log({ projectId, userId });

  // check subscription status
  const checkDonorSubscriptionStatus = await getData(
    `/volunteer/subscription/check/${userId}/${projectId}`,
    token,
  );

  const subscriptionStatus = checkDonorSubscriptionStatus?.results ?? false;

  return (
    <Suspense fallback={<Loader className="h-screen" />}>
      <VolunteerProjectDetails
        session={session}
        dataPromise={dataPromise}
        projectId={projectId}
        isSubscribed={subscriptionStatus}
      />
    </Suspense>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { projectId: string };
}) {
  const projectId = params.projectId;
  const session = await auth();
  const token = session?.user?.token;

  const data = await getData(`/volunteer/project/show/${projectId}`, token);

  return {
    title: `${data?.results?.title} - ${config.get("app.name")}`,
    description:
      "Learn about Horizon Welfare's mission to uplift underprivileged urban communities. Discover our initiatives, values, and how we strive to create lasting change through collective efforts.",
  };
}
