import { CheckIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PasswordResetSuccess() {
  return (
    <main className="flex h-[600px] flex-col items-center justify-center gap-4">
      <CheckIcon />
      <h2 className="text-center text-[42px] font-extrabold leading-[70px]">
        Your Password has been Recovered
      </h2>
      <Link href={"/login"}>
        <Button>Visit Login Page</Button>
      </Link>
    </main>
  );
}
