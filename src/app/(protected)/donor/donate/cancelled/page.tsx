import Cross from "@/../../public/images/cross.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function ProjectDonationCancelled({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { error } = searchParams;
  return (
    <main>
      <section className="flex h-[calc(100vh-250px)] flex-col items-center justify-center gap-y-4 px-4 md:gap-y-6">
        <Image
          src={Cross}
          alt="Donate"
          className="h-[150px] w-fit sm:h-[200px] md:h-[300px]"
        />
        <h4 className="text-center text-xl font-extrabold sm:text-2xl xmd:text-3xl lg:text-4xl">
          Payment Cancelled !
        </h4>
        <h4 className="text-center text-base font-semibold sm:text-lg md:text-xl lg:text-2xl">
          Reason : {error}
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
