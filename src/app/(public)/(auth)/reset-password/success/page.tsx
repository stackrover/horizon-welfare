import { CheckIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PasswordResetSuccess() {
  return (
    <main className="flex h-[600px] flex-col items-center justify-center gap-4 px-4">
      <CheckIcon className="h-[100px] md:h-[150px] xmd:h-[180px] lg:h-[224px]" />
      <h2 className="text-center text-xl font-extrabold md:text-2xl xmd:text-3xl mlg:text-4xl 2xl:text-[42px] 2xl:leading-[70px]">
        Your Password has been Recovered
      </h2>
      <Link href={"/login"}>
        <Button>Visit Login Page</Button>
      </Link>
    </main>
  );
}
