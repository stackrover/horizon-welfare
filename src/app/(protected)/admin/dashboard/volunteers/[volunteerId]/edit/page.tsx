import { auth } from "@/auth";
import { Loader, VolunteerProfile } from "@/components";
import { getVolunteerProfile } from "@/hooks/get-volunteer-profile";
import { config } from "@/utils/config";
import { Suspense } from "react";

export default async function VolunteerUpdate({
  params,
}: {
  params: Promise<{ volunteerId: string }>;
}) {
  const session = await auth();
  const userId = (await params).volunteerId;
  const token = session?.user?.token;

  const dataPromise = getVolunteerProfile(userId, token);

  return (
    <Suspense fallback={<Loader className="h-screen" />}>
      <VolunteerProfile
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
    title: `Volunteer Profile - ${config.get("app.name")}`,
    description:
      "Learn about Horizon Welfare's mission to uplift underprivileged urban communities. Discover our initiatives, values, and how we strive to create lasting change through collective efforts.",
  };
}
