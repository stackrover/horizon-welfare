import { auth } from "@/auth";
import { DonorTransactions, Loader } from "@/components";
import { getData } from "@/hooks/get-data";
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
