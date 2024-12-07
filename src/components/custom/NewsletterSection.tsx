import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function NewsletterSection({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-1 items-center justify-between gap-x-8 rounded-2xl bg-base-0 p-4 shadow-[7px_20px_50px_rgba(0,0,0,0.09)] xmd:p-8 3xl:pl-16",
        className,
      )}
    >
      <div className="hidden md:block">
        <h2 className="text-2xl font-extrabold leading-8 text-base-400 xl:text-4xl xl:leading-[48px] 2xl:text-[40px]">
          Newsletter
        </h2>
        <h5 className="text-sm font-normal leading-8 text-base-300 2xl:text-base">
          Get Update on out latest project
        </h5>
      </div>
      <form className="flex w-full max-w-[500px] flex-1 items-center rounded-lg bg-[rgba(239,241,249,0.6)] p-1">
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
