import { auth } from "@/auth";
import { DonorMonthlySubscribedPackages, Loader } from "@/components";
import { getDonorSubscribedProjects } from "@/hooks/get-donor-subscribed-projects";
import { Suspense } from "react";

export default async function MonthlySubscription() {
  const session = await auth();
  const userId = session?.user?.id;
  const token = session?.user?.token;

  const donorSubscribedProjectsPromise = getDonorSubscribedProjects(
    userId,
    token,
  );

  return (
    <Suspense fallback={<Loader className="h-screen" />}>
      <DonorMonthlySubscribedPackages
        donorSubscribedProjectsPromise={donorSubscribedProjectsPromise}
      />
    </Suspense>
  );
}
