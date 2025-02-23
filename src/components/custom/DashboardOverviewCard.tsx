import { cn } from "@/lib/utils";
import { TablerIcon } from "@tabler/icons-react";
import * as React from "react";

interface PropsType {
  title: string;
  value: string;
  className?: string;
  Icon: ((props: any) => React.ReactElement) | TablerIcon;
  iconClass?: string;
}

export function DashboardOverviewCard({
  title,
  value,
  Icon,
  className,
  iconClass,
}: PropsType) {
  return (
    <div
      className={cn(
        "relative rounded-md bg-card p-6 text-card-foreground shadow-[0_0_2px_rgba(0,0,0,0.2)]",
        className,
      )}
    >
      <h5 className="text-base font-semibold leading-[26px] text-foreground/70">
        {title}
      </h5>
      <h1 className="text-2xl font-bold leading-[45.83px] tracking-[1.2px] text-foreground">
        {value}
      </h1>
      <div
        className={cn(
          "pointer-events-none absolute right-4 top-1/2 flex size-[72px] -translate-y-1/2 items-center justify-center rounded-[28px] bg-accent p-4",
          iconClass,
        )}
      >
        <Icon />
      </div>
    </div>
  );
}
