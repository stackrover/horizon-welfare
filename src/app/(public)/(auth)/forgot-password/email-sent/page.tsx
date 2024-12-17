import { GmailIcon } from "@/assets/icons";

export default function ForgotPasswordEmailSent() {
  return (
    <main className="flex h-[600px] flex-col items-center justify-center gap-4 px-4">
      <GmailIcon className="h-[100px] md:h-[150px] xmd:h-[180px] lg:h-[224px]" />
      <h2 className="text-center text-xl font-extrabold md:text-2xl xmd:text-3xl mlg:text-4xl 2xl:text-[42px] 2xl:leading-[70px]">
        Password Reset Link has been Sent <br /> Please check your Inbox or Spam
        box
      </h2>
    </main>
  );
}
