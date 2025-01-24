import { auth } from "@/auth";
import { DonorTransactions, Loader } from "@/components";
import { getData } from "@/hooks/get-data";
import { config } from "@/utils/config";
import { Suspense } from "react";

export default async function Transactions() {
  const session = await auth();

  const dataPromise = getData(
    `/donor/donations/${session?.user?.id}`,
    session?.user?.token,
  );

  return (
    <Suspense fallback={<Loader className="h-screen w-full" />}>
      <DonorTransactions dataPromise={dataPromise} />
    </Suspense>
  );
}

export async function generateMetadata() {
  return {
    title: `Transactions - ${config.get("app.name")}`,
    description:
      "Learn about Horizon Welfare's mission to uplift underprivileged urban communities. Discover our initiatives, values, and how we strive to create lasting change through collective efforts.",
  };
}
