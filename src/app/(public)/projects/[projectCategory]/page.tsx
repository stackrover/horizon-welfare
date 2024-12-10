"use client";

import { DonationCard, Loader, SectionWrapper } from "@/components";
import { ProjectByCategory } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";

export default function ProjectsByCategory() {
  const pathname = usePathname();
  const params = useParams();

  const { data, isLoading, isError } = useSWR(
    `/project/category/show/${params.projectCategory}`,
  );

  if (isLoading) {
    return <Loader className="h-[540px]" />;
  }

  const serializedData = new ProjectByCategory(data?.data?.results);

  console.log({ serializedData, data });

  return (
    <main>
      <SectionWrapper
        isLoading={isLoading}
        isError={isError}
        errorClass="h-[540px]"
        loadingClass="h-[540px]"
        hidden={serializedData.status !== "active"}
        className="container mt-[100px]"
      >
        {/* project section  */}
        <div className="flex items-center justify-between">
          <h1 className="my-8 text-[56px] font-extrabold leading-[67px] text-base-400">
            Your Donation May Change <br /> Someones Life
          </h1>
          <div
            className={`relative flex h-[130px] w-[434px] items-center justify-between rounded-lg bg-cover bg-center before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-[20px] before:bg-black/50 before:content-['']`}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}${serializedData.icon}`}
              alt="Join as a volunteer"
              height={130}
              width={434}
              className="h-[130px] w-[434px]"
            />

            <div className="absolute left-0 top-0 z-10 mx-auto flex h-full w-full flex-col items-center justify-center gap-y-8 p-8">
              <h4 className="text-center text-3xl font-bold text-base-0">
                {serializedData.title}
              </h4>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-6 gap-y-8">
          {serializedData?.projects?.length > 0
            ? serializedData.projects.map((project, index) => (
                <DonationCard key={index} cardData={project} />
              ))
            : null}
        </div>
      </SectionWrapper>
      {/* project section end */}
    </main>
  );
}
