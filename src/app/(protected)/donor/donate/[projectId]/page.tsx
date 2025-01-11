import { auth } from "@/auth";
import { Loader, ProjectDonation } from "@/components";
import { getData } from "@/hooks/get-data";
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
