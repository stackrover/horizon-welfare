import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type SocialIconType = {
  className?: string;
  icon?: React.ReactNode;
};

export function SocialIcon({ className, icon }: SocialIconType) {
  return (
    <Link
      href="/"
      className={cn(
        "flex h-[60px] w-[60px] items-center justify-center rounded-full bg-primary/10 from-primary-light to-primary text-primary hover:bg-gradient-to-r hover:text-base-0 xmd:h-[75px] xmd:w-[75px]",
        className,
      )}
    >
      {icon}
    </Link>
  );
}
