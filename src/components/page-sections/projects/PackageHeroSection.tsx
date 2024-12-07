"use client";

import { Loader } from "@/components/custom/Loader";
import { SectionWrapper } from "@/components/custom/SectionWrapper";
import { Button } from "@/components/ui/button";
import { ProjectHeroSection } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn } from "@/lib/utils";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";

export function PackageHeroSection({ className }: { className?: string }) {
  const { data, isLoading, isError } = useSWR("/donate/page/hero/show");

  if (isLoading) {
    return <Loader className="h-[540px]" />;
  }

  const serializedData = new ProjectHeroSection(_.head(data?.data?.results));

  return (
    <SectionWrapper
      isLoading={isLoading}
      isError={isError}
      errorClass="h-[540px]"
      loadingClass="h-[540px]"
      hidden={serializedData.status !== "active"}
      className={cn("bg-[#CEF4FF] py-[80px]", className)}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4">
        <div>
          <h4 className="mb-6 text-base font-bold leading-[18px] text-base-400">
            {serializedData.title}
          </h4>
          <h1 className="mb-10 text-[56px] font-bold leading-[68px] text-base-400">
            {serializedData.focusTitle}
          </h1>
          <p className="mb-4 text-base leading-[26px] text-base-300">
            {serializedData.description}
          </p>
          <Link href={serializedData.btnLink}>
            <Button className="rounded-sm">{serializedData.btnTitle}</Button>
          </Link>
        </div>
        <div className="flex justify-end">
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}${serializedData.image}`}
            alt="Donate"
            width={552}
            height={419}
            className="h-[419px] w-[552px]"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
