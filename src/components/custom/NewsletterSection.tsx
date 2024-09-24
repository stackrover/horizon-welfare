import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  return (
    <div className="flex h-full flex-1 items-center justify-between rounded-2xl bg-base-0 px-8 py-8 pl-16 shadow-[7px_20px_50px_rgba(0,0,0,0.09)]">
      <div>
        <h2 className="text-[40px] font-extrabold leading-[48px] text-base-400">
          Newsletter
        </h2>
        <h5 className="text-base font-normal leading-8 text-base-300">
          Get Update on out latest project
        </h5>
      </div>
      <form className="flex max-w-[500px] flex-1 items-center rounded-lg bg-[rgba(239,241,249,0.6)] p-1">
        <Input
          className="w-full border-none bg-transparent shadow-none focus:shadow-none focus-visible:ring-0"
          placeholder="Email Address"
          type="text"
        />
        <Button>Subscribe</Button>
      </form>
    </div>
  );
}
