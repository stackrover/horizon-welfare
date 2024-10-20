"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProjectCardProps } from "@/types/types";
import Link from "next/link";

export function ProjectCard({
  title,
  description,
  path,
  className,
}: ProjectCardProps) {
  return (
    <div
      className={cn(
        `relative h-[420px] rounded-[20px] bg-cover bg-center before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-[20px] before:bg-black/50 before:content-['']`,
        className,
      )}
    >
      <div className="absolute left-0 top-0 z-10 flex h-full flex-col justify-between p-12">
        <div className="flex flex-col gap-y-4">
          <h4 className="text-[28px] font-bold leading-[42px] text-base-0">
            {title}
          </h4>
          <p className="text-base font-normal leading-6 text-base-100">
            {description}
          </p>
        </div>
        <Link href={path}>
          <Button variant="light" className="w-fit">
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  );
}
