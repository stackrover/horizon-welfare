"use client";

import { Separator } from "@/components/ui/separator";
import { ProjectProps } from "@/types/types";
import { IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export function Project({ title, icon, link }: ProjectProps) {
  return (
    <div className="rounded border p-4 shadow-sm">
      <div className="flex items-center gap-x-6">
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}${icon}`}
          alt="project image"
          width={120}
          height={120}
          className="h-[100px] w-[100px] sm:h-[120px] sm:w-fit"
        />
        <h2 className="text-xl font-bold leading-6 text-base-400">{title}</h2>
      </div>
      <Separator className="my-4" />
      <div className="flex justify-center">
        <Link href={link}>
          <Button className="gap-x-2 font-bold text-destructive" variant="link">
            <span>VISIT PROJECT</span>
            <IconArrowRight size={20} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
