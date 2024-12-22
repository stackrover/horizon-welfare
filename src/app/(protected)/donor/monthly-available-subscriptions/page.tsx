import { auth } from "@/auth";
import { DonorAvailableProjects, Loader } from "@/components";
import { getDonorAvailableProjects } from "@/hooks/get-donor-available-projects";
import { Suspense } from "react";

export default async function MonthlyAvailableSubscription() {
  const session = await auth();
  const userId = session?.user?.id;
  const token = session?.user?.token;

  const donorAvailableProjectsPromise = getDonorAvailableProjects(
    userId,
    token,
  );

  return (
    <Suspense fallback={<Loader className="h-screen" />}>
      <DonorAvailableProjects
        donorAvailableProjectsPromise={donorAvailableProjectsPromise}
      />
    </Suspense>
  );
}
