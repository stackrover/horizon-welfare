"use client";

import {
  DonationCard,
  JoinAsVolunteerCard,
  Loader,
  PackageHeroSection,
  SectionWrapper,
} from "@/components";
import { ProjectByCategory } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";

export function ProjectsByCategory() {
  const pathname = usePathname();
  const params = useParams();

  const { data, isLoading, isError } = useSWR(
    `/project/category/show/${params.projectCategory}`,
  );

  if (isLoading) {
    return <Loader className="h-[540px]" />;
  }

  const serializedData = new ProjectByCategory(data?.data?.results);

  return (
    <main>
      <PackageHeroSection />
      <SectionWrapper
        isLoading={isLoading}
        isError={isError}
        errorClass="h-[540px]"
        loadingClass="h-[540px]"
        hidden={serializedData.status !== "active" || !data?.data?.results}
        className="container mt-[100px]"
      >
        {/* project section  */}
        <div className="my-8 flex flex-col-reverse justify-between gap-4 xl:flex-row xl:items-center xl:gap-20">
          <h1 className="text-3xl font-extrabold text-base-400 sm:text-4xl mlg:text-5xl mlg:leading-[67px] 2xl:text-[56px]">
            Your Donation May Change Someones Life
          </h1>
          <div
            className={`relative flex h-[100px] w-[300px] items-center justify-between rounded-lg bg-cover bg-center before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-[20px] before:bg-black/50 before:content-[''] md:w-[434px] mlg:h-[130px]`}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}${serializedData.icon}`}
              alt="Join as a volunteer"
              height={130}
              width={434}
              className="h-[100px] w-[300px] md:w-[434px] mlg:h-[130px]"
            />

            <div className="absolute left-0 top-0 z-10 mx-auto flex h-full w-full flex-col items-center justify-center gap-y-8 p-8">
              <h4 className="text-center text-xl font-bold text-base-0 md:text-2xl 2xl:text-3xl">
                {serializedData.title}
              </h4>
            </div>
          </div>
        </div>

        <div className="grid gap-x-4 gap-y-4 md:grid-cols-2 lg:grid-cols-3 2xl:gap-x-6 2xl:gap-y-8">
          {serializedData?.projects?.length > 0
            ? serializedData.projects.map((project, index) => (
                <DonationCard key={index} cardData={project} />
              ))
            : null}
        </div>
      </SectionWrapper>
      {/* project section end */}

      <JoinAsVolunteerCard />
    </main>
  );
}
