import { auth } from "@/auth";
import { DonorProfile, Loader } from "@/components";
import { getDonorProfile } from "@/hooks/getDonorProfile";
import { Suspense } from "react";

export default async function DonorProfilePage() {
  const session = await auth();
  const userId = session?.user?.id;
  const token = session?.user?.token;

  const dataPromise = getDonorProfile(userId, token);

  return (
    <Suspense fallback={<Loader className="h-screen" />}>
      <DonorProfile dataPromise={dataPromise} userId={userId} />;
    </Suspense>
  );
}
