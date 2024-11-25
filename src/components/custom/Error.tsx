import { cn } from "@/lib/utils";

export function Error({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-[400px] w-full items-center justify-center",
        className,
      )}
    >
      <h4 className="text-xl font-semibold text-base-400">
        Something went wrong in this section!
      </h4>
    </div>
  );
}
