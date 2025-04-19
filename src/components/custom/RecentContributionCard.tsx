import { cn } from "@/lib/utils";
import { RecentDonationType } from "@/types/types";
import { IconHeartFilled } from "@tabler/icons-react";

export function RecentContributionCard({
  className,
  recentContributions,
}: {
  className?: string;
  recentContributions: RecentDonationType[];
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-y-6 rounded border px-6 py-12 shadow",
        className,
      )}
    >
      {recentContributions?.length > 0 ? (
        recentContributions.map((item) => (
          <div key={item.uid}>
            <h4 className="mb-2 text-lg font-medium leading-6 text-base-300 md:text-xl">
              {`${item.fName} Contributed`}
            </h4>
            <h3 className="flex items-center gap-2 text-2xl font-bold leading-8 text-base-400">
              <IconHeartFilled size={28} fill="red" />
              <span>{item.amount}</span>
            </h3>
          </div>
        ))
      ) : (
        <p className="text-center">No Recent Contribution!</p>
      )}
    </div>
  );
}
