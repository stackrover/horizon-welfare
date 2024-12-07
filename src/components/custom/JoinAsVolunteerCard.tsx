"use client";

import { Loader, SectionWrapper } from "@/components";
import { Button } from "@/components/ui/button";
import { JoinAsVolunteer } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";

export function JoinAsVolunteerCard() {
  const { data, isLoading, isError } = useSWR("/volunteer/cta/show");

  if (isLoading) {
    return <Loader className="h-[300px]" />;
  }

  const serializedData = new JoinAsVolunteer(_.head(data?.data?.results));

  return (
    <SectionWrapper
      isLoading={isLoading}
      isError={isError}
      errorClass="h-[300px]"
      loadingClass="h-[300px]"
      hidden={serializedData.status !== "active"}
      className={`relative mx-auto mt-[100px] h-[384px] max-w-7xl rounded-[20px] bg-cover bg-center before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-[20px] before:bg-black/50 before:content-['']`}
    >
      <div>
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}${serializedData.image}`}
          alt="Join as a volunteer"
          height={300}
          width={1200}
          className="h-full w-full"
        />
      </div>
      <div className="absolute left-0 top-0 z-10 mx-auto flex h-full w-full flex-col items-center justify-center gap-y-8 p-8">
        <h4 className="max-w-[900px] text-center text-5xl font-bold leading-[58px] text-base-0">
          You can contribute to provide a place for children with special needs!
        </h4>
        <div className="flex items-center gap-4">
          <Link href={serializedData.volunteerBtnLink}>
            <Button className="w-fit">
              {serializedData.volunteerBtnTitle}
            </Button>
          </Link>
          <Link href={serializedData.donateBtnLink}>
            <Button variant="light" className="w-fit">
              {serializedData.donateBtnTitle}
            </Button>
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
