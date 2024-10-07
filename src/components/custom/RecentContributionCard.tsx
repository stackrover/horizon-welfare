import { cn } from "@/lib/utils";
import { IconHeartFilled } from "@tabler/icons-react";

export function RecentContributionCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-y-6 rounded border px-6 py-12 shadow",
        className,
      )}
    >
      <Contribution />
      <Contribution />
      <Contribution />
    </div>
  );
}

const Contribution = () => {
  return (
    <div>
      <h4 className="mb-2 text-xl font-medium leading-6 text-base-300">
        Sam Contributed
      </h4>
      <h3 className="flex items-center gap-2 text-2xl font-bold leading-8 text-base-400">
        <IconHeartFilled size={28} fill="red" />
        <span>20,000</span>
      </h3>
    </div>
  );
};
