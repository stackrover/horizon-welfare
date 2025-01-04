import { auth } from "@/auth";
import { Loader, VolunteerProfile } from "@/components";
import { getVolunteerProfile } from "@/hooks/get-volunteer-profile";
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
