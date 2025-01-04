"use client";

import {
  ContactDetailsCard,
  DonorPackageDetailsAsideCardSection,
  ProjectDetailSectionWrapper,
} from "@/components";
import { DonorSubscribedProject } from "@/data";
import _ from "lodash";
import Image from "next/image";
import React from "react";
import SirenIcon from "../../../../public/icons/SirenIcon";

export function DonorPackageDetailsPage({
  session,
  dataPromise,
  projectId,
  isSubscribed,
}: {
  session: any;
  dataPromise: Promise<any>;
  projectId: string;
  isSubscribed: boolean | undefined | null;
}) {
  const data = React.use(dataPromise);

  console.log(data);
  console.log(Array.isArray(data?.results));

  const serializedData = data?.results
    ? new DonorSubscribedProject(_.head(data?.results))
    : null;

  console.log(serializedData);

  if (!serializedData) {
    return (
      <div>
        <h4 className="text-xl font-semibold text-base-300">
          No data to show!
        </h4>
      </div>
    );
  }

  return (
    <main>
      {/* image gallery section  */}
      <section className="container mt-[60px]">
        <h1 className="mb-4 text-2xl font-semibold leading-[48px] text-base-400 md:text-3xl mlg:text-[40px]">
          {serializedData.title}
        </h1>
        <div
          data-emergency={serializedData.isEmergency}
          className="hidden w-fit items-center gap-4 rounded-full bg-[#FEF3F2] px-6 py-1 text-sm font-medium data-[emergency=1]:flex xmd:px-10 xmd:py-2 xmd:text-base"
        >
          <SirenIcon className="mb-1" />
          <h4 className="text-[#B42318]">Emergency Requirement</h4>
        </div>

        <div className="mt-10 flex items-start gap-2">
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}${serializedData.thumbnail}`}
            alt="project image"
            width={1800}
            height={600}
            className="h-fit max-h-[1000px] w-full"
          />
        </div>
      </section>
      {/* image gallery section end  */}

      {/* details section  */}
      <section className="container mt-10 flex flex-col items-start gap-6 mlg:flex-row">
        {/* about section  */}
        <div className="flex w-full flex-1 flex-col gap-y-6">
          <ProjectDetailSectionWrapper title="About">
            <p className="text-sm text-base-300 md:text-base">
              {serializedData.description}
            </p>
          </ProjectDetailSectionWrapper>

          <ProjectDetailSectionWrapper title="Contact Details">
            {serializedData?.managers?.length > 0
              ? serializedData.managers.map((manager) => {
                  return (
                    <ContactDetailsCard key={manager.id} manager={manager} />
                  );
                })
              : null}
          </ProjectDetailSectionWrapper>
        </div>
        {/* about section end  */}

        {/* aside section  */}
        <DonorPackageDetailsAsideCardSection
          packageId={serializedData?.packageId}
          isSubscribed={isSubscribed}
        />
      </section>
    </main>
  );
}
