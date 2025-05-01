import { auth } from "@/auth";
import { DonorProfile, Loader } from "@/components";
import { getDonorProfile } from "@/hooks/getDonorProfile";
import { config } from "@/utils/config";
import { Suspense } from "react";

export default async function DonorProfileUpdate({
  params,
}: {
  params: Promise<{ donorId: string }>;
}) {
  const session = await auth();
  const userId = (await params).donorId;
  const token = session?.user?.token;

  const dataPromise = getDonorProfile(userId, token);

  return (
    <Suspense fallback={<Loader className="h-screen" />}>
      <DonorProfile
        dataPromise={dataPromise}
        userId={userId}
        containerClass="p-6 m-0"
        formClass="p-6 border rounded-lg bg-base-0"
      />
    </Suspense>
  );
}

export async function generateMetadata() {
  return {
    title: `Donor Profile - ${config.get("app.name")}`,
    description:
      "Learn about Horizon Welfare's mission to uplift underprivileged urban communities. Discover our initiatives, values, and how we strive to create lasting change through collective efforts.",
  };
}
