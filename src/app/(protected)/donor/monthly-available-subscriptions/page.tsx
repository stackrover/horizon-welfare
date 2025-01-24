import { auth } from "@/auth";
import { DonorAvailableProjects, Loader } from "@/components";
import { getDonorAvailableProjects } from "@/hooks/get-donor-available-projects";
import { config } from "@/utils/config";
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

export async function generateMetadata() {
  return {
    title: `Monthly Available Subscriptions - ${config.get("app.name")}`,
    description:
      "Learn about Horizon Welfare's mission to uplift underprivileged urban communities. Discover our initiatives, values, and how we strive to create lasting change through collective efforts.",
  };
}
