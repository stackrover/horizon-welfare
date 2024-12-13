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
      <h3 className="text-lg font-bold leading-[28px] text-base-400 md:text-2xl">
        {title}
      </h3>
      {children}
    </div>
  );
}
