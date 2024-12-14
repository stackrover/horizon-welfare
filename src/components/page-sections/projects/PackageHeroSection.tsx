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
      hidden={
        serializedData.status !== "active" || data?.data?.results?.length === 0
      }
      className={cn("bg-[#CEF4FF] py-10 mlg:py-[80px]", className)}
    >
      <div className="mx-auto grid max-w-7xl gap-4 px-4 mlg:grid-cols-2">
        <div>
          <h4 className="mb-6 text-base font-bold leading-[18px] text-base-400">
            {serializedData.title}
          </h4>
          <h1 className="mb-6 text-4xl font-bold text-base-400 mlg:mb-10 mlg:text-5xl mlg:leading-[68px] 2xl:text-[56px]">
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
            className="h-fit w-full"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
