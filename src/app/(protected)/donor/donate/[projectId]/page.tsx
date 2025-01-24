import { auth } from "@/auth";
import { Loader, ProjectDonation } from "@/components";
import { getData } from "@/hooks/get-data";
import { config } from "@/utils/config";
import { Suspense } from "react";

export default async function DonorDonationPage({
  params,
}: {
  params: { projectId: string };
}) {
  const session = await auth();
  const projectId = params.projectId;

  const userId = session?.user?.id;
  const token = session?.user?.token;

  const dataPromise = getData(`/project/show/${projectId}`, token);

  return (
    <Suspense fallback={<Loader className="h-screen" />}>
      <ProjectDonation
        session={session}
        dataPromise={dataPromise}
        projectId={projectId}
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

  const data = await getData(`/project/show/${projectId}`, token);

  return {
    title: `Donation For ${data?.results?.title} - ${config.get("app.name")}`,
    description:
      "Learn about Horizon Welfare's mission to uplift underprivileged urban communities. Discover our initiatives, values, and how we strive to create lasting change through collective efforts.",
  };
}
