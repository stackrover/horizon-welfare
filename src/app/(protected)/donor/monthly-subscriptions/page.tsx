import { auth } from "@/auth";
import { DonorMonthlySubscribedPackages, Loader } from "@/components";
import { getDonorSubscribedProjects } from "@/hooks/get-donor-subscribed-projects";
import { config } from "@/utils/config";
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

export async function generateMetadata() {
  return {
    title: `Monthly Subscriptions - ${config.get("app.name")}`,
    description:
      "Learn about Horizon Welfare's mission to uplift underprivileged urban communities. Discover our initiatives, values, and how we strive to create lasting change through collective efforts.",
  };
}
