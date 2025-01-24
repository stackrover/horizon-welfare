import { auth } from "@/auth";
import { Loader, VolunteerProfile } from "@/components";
import { getVolunteerProfile } from "@/hooks/get-volunteer-profile";
import { config } from "@/utils/config";
import { Suspense } from "react";

export default async function VolunteerProfilePage() {
  const session = await auth();
  const userId = session?.user?.id;
  const token = session?.user?.token;

  const dataPromise = getVolunteerProfile(userId, token);

  return (
    <Suspense fallback={<Loader className="h-screen" />}>
      <VolunteerProfile dataPromise={dataPromise} userId={userId} />;
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
