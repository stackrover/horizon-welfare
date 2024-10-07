import { cn } from "@/lib/utils";
import React from "react";

export function ProjectDetailSectionWrapper({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title: string;
}) {
  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      <h3 className="text-2xl font-bold leading-[28px] text-base-400">
        {title}
      </h3>
      {children}
    </div>
  );
}
