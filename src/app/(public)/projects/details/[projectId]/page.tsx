import { auth } from "@/auth";
import { Loader, ProjectDetailsPage } from "@/components";
import { getData } from "@/hooks/get-data";
import { Suspense } from "react";

export default async function SingleProjectDetails({
  params,
}: {
  params: { projectId: string };
}) {
  const session = await auth();
  const projectId = params.projectId;

  const userId = session?.user?.id;
  const token = session?.user?.token;

  const dataPromise = getData(`/project/show/${projectId}`, token);

  // check subscription status
  const checkDonorSubscriptionStatus = await getData(
    `/project/subscription/check/${userId}/${projectId}`,
    token,
  );

  const subscriptionStatus = checkDonorSubscriptionStatus?.results ?? false;

  return (
    <Suspense fallback={<Loader className="h-screen" />}>
      <ProjectDetailsPage
        session={session}
        dataPromise={dataPromise}
        projectId={projectId}
        isSubscribed={subscriptionStatus}
      />
    </Suspense>
  );
}
