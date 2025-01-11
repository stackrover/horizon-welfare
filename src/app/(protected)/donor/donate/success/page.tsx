import Signboard from "@/../../public/images/signboard.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function ProjectDonationSuccess({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { trxId } = searchParams;
  console.log(trxId);
  return (
    <main>
      <section className="flex h-[calc(100vh-250px)] flex-col items-center justify-center gap-y-4 px-4 md:gap-y-6">
        <Image
          src={Signboard}
          alt="Donate"
          className="h-[150px] w-fit sm:h-[200px] md:h-[300px]"
        />
        <h4 className="text-center text-xl font-semibold sm:text-2xl xmd:text-3xl lg:text-4xl">
          Thanks for Donation on th Project
        </h4>
        <h4 className="text-center text-xl font-extrabold sm:text-2xl xmd:text-3xl lg:text-4xl">
          Donation ID : {trxId}
        </h4>
        <div className="flex items-center gap-x-4">
          <Button asChild>
            <Link href="/donor/transactions">See Transaction</Link>
          </Button>
          <Button variant="light">
            <Link href="/donor/profile">Go To Profile</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
