import { cn } from "@/lib/utils";

export function Loader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-[400px] w-full flex-col items-center justify-center gap-2",
        className,
      )}
    >
      <div className="dot-spinner">
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
      </div>
      <h4 className="text-xl font-semibold text-base-400">Loading...</h4>
    </div>
  );
}
