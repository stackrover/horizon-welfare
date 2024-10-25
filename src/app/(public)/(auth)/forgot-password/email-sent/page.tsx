import { GmailIcon } from "@/assets/icons";

export default function ForgotPasswordEmailSent() {
  return (
    <main className="flex h-[600px] flex-col items-center justify-center gap-4">
      <GmailIcon />
      <h2 className="text-center text-[42px] font-extrabold leading-[70px]">
        Password Reset Link has been Sent <br /> Please check your Inbox or Spam
        box
      </h2>
    </main>
  );
}
