"use client";

import {
  ContactDetailsCard,
  ProjectAsideCardSection,
  ProjectDetailSectionWrapper,
} from "@/components";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Project } from "@/data";
import { IconFileTypeDoc, IconX } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import SirenIcon from "../../../../public/icons/SirenIcon";

export function ProjectDetailsPage({
  session,
  dataPromise,
  projectId,
}: {
  session: any;
  dataPromise: Promise<any>;
  projectId: string;
}) {
  const data = React.use(dataPromise);

  const serializedData = new Project(data?.results);

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

      {/* project gallery section  */}
      <section className="container mt-[60px]">
        <ProjectDetailSectionWrapper title="Image Gallery">
          <div className="grid gap-4 sm:grid-cols-2 xmd:grid-cols-3 xl:grid-cols-4">
            {serializedData?.images?.length > 0
              ? serializedData.images.map((img) => (
                  <Image
                    key={img.id}
                    src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}${img.link}`}
                    alt={img.title}
                    width={356}
                    height={246}
                    className="h-[150px] w-full sm:h-[120px] md:h-[140px] mlg:h-[180px] 2xl:h-[200px]"
                  />
                ))
              : null}
          </div>
        </ProjectDetailSectionWrapper>
      </section>
      {/* project gallery section end */}

      {/* details section  */}
      <section className="container mt-10 flex flex-col items-start gap-6 mlg:flex-row">
        {/* about section  */}
        <div className="flex w-full flex-1 flex-col gap-y-6">
          <ProjectDetailSectionWrapper title="About">
            <p className="text-sm text-base-300 md:text-base">
              {serializedData.description}
            </p>
          </ProjectDetailSectionWrapper>

          <ProjectDetailSectionWrapper title="Documents">
            <div className="mt-4 flex flex-col gap-6">
              <div className="grid grid-cols-3 gap-4">
                {serializedData.documents.length > 0
                  ? serializedData.documents.map((doc) => (
                      <Drawer key={doc.id}>
                        <DrawerTrigger className="flex aspect-square w-full items-center justify-center rounded-md bg-base-50 text-base-300 shadow-sm hover:bg-base-100">
                          <IconFileTypeDoc size={32} />
                        </DrawerTrigger>
                        <DrawerContent className="h-[calc(100vh-50px)]">
                          <DrawerHeader>
                            <DrawerTitle className="hidden">hello</DrawerTitle>
                            <DrawerClose
                              asChild
                              className="absolute right-2 top-2"
                            >
                              <Button
                                variant="secondary"
                                size="icon"
                                className="h-7 w-7"
                              >
                                <IconX size={18} />
                              </Button>
                            </DrawerClose>
                          </DrawerHeader>
                          <div className="h-full">
                            <iframe
                              src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}${doc.link}`}
                              className="h-full w-full border-0"
                            ></iframe>
                          </div>
                        </DrawerContent>
                      </Drawer>
                    ))
                  : null}
              </div>
            </div>
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
        <ProjectAsideCardSection
          serializedData={serializedData}
          session={session}
        />
      </section>
    </main>
  );
}
