"use client";

import { ContactUsForm, Loader } from "@/components";
import { SectionWrapper } from "@/components/custom/SectionWrapper";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { EventDetail } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { IconFileTypeDoc, IconX } from "@tabler/icons-react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default function EventDetails() {
  const { data, isLoading, isError } = useSWR("/event/show/1");

  if (isLoading) {
    return <Loader className="h-screen" />;
  }

  const serializedData = new EventDetail(data?.data?.results);

  const formattedContent = serializedData?.description?.split("\r\n").reduce(
    (acc: { type: string; text: string }[], line) => {
      if (line.startsWith("—")) {
        // Add bullet points
        acc.push({ type: "bullet", text: line.replace("—", "").trim() });
      } else if (line.includes(":") && !line.startsWith("   ")) {
        // Add headers (like "Panelists:")
        acc.push({ type: "header", text: line.trim() });
      } else if (line.startsWith("   ")) {
        // Add descriptions for panelists
        acc.push({ type: "description", text: line.trim() });
      } else if (line) {
        // Add general paragraphs
        acc.push({ type: "paragraph", text: line.trim() });
      }
      return acc;
    },
    [] as { type: string; text: string }[],
  );

  return (
    <main className="mx-auto max-w-[992px]">
      <SectionWrapper
        isLoading={isLoading}
        isError={isError}
        errorClass="h-screen"
        loadingClass="h-screen"
        className="mt-20"
      >
        <h1 className="mb-2 text-5xl font-bold leading-[54px] text-base-400">
          {serializedData.title}
        </h1>
        <h4 className="mb-8 text-2xl font-semibold leading-10 text-base-300">
          {format(new Date(serializedData.createdAt), "EEEE, dd MMMM yyyy")}
        </h4>
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}${serializedData.thumbnail}`}
          alt="Event"
          height={360}
          width={992}
          className="h-[360px] w-full"
        />

        <div className="mt-10 grid h-[252px] grid-cols-12 gap-8">
          <iframe
            src={serializedData.mapLink}
            width="800"
            height="252"
            className="col-span-8 h-full w-full"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <div className="col-span-4">
            <h4 className="mb-4 text-2xl font-bold text-base-400">Location</h4>
            <p className="mb-6 text-base text-base-300">
              {serializedData.location}
            </p>
            <h4 className="mb-4 text-2xl font-bold text-base-400">
              Event start
            </h4>
            <p className="text-base text-base-300">
              {serializedData.scheduleTime}, {serializedData.scheduleDate}
            </p>
            <div className="mt-4 flex items-center gap-6">
              <h3 className="text-lg font-semibold text-base-300">Join :</h3>
              {serializedData.meetLink ? (
                <Link target="_blank" href={serializedData.meetLink}>
                  <Image
                    src={`/images/meet.png`}
                    alt="meet"
                    height={40}
                    width={40}
                    className="h-fit w-10"
                  />
                </Link>
              ) : null}
              {serializedData.zoomLink ? (
                <Link target="_blank" href={serializedData.zoomLink}>
                  <Image
                    src={`/images/zoom.png`}
                    alt="meet"
                    height={40}
                    width={40}
                    className="aspect-square h-fit w-10 rounded-full"
                  />
                </Link>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-4 text-base-400">
          {formattedContent.length > 0
            ? formattedContent.map((item, index) => {
                switch (item.type) {
                  case "bullet":
                    return (
                      <p
                        key={index}
                        className="pl-4 before:pr-2 before:content-['•']"
                      >
                        {item.text}
                      </p>
                    );
                  case "header":
                    return (
                      <h3 key={index} className="mt-4 font-bold">
                        {item.text}
                      </h3>
                    );
                  case "description":
                    return (
                      <p key={index} className="pl-8">
                        {item.text}
                      </p>
                    );
                  case "paragraph":
                  default:
                    return <p key={index}>{item.text}</p>;
                }
              })
            : null}
        </div>

        <div className="mt-10 flex flex-col gap-6">
          <h5 className="text-lg font-bold">Documents</h5>

          <div className="grid grid-cols-3 gap-4">
            {serializedData.documents.length > 0
              ? serializedData.documents.map((doc) => (
                  <Drawer key={doc.id}>
                    <DrawerTrigger className="flex aspect-square w-full items-center justify-center rounded-md bg-base-50 text-base-300 shadow-sm hover:bg-base-100">
                      <IconFileTypeDoc size={32} />
                    </DrawerTrigger>
                    <DrawerContent className="h-[calc(100vh-50px)]">
                      <DrawerHeader>
                        <DrawerClose className="absolute right-2 top-2">
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

        <div className="mt-10">
          <h2 className="mb-8 text-center text-5xl font-bold leading-[54px] text-base-300">
            Are you coming contact us
          </h2>
          <ContactUsForm />
        </div>
      </SectionWrapper>
    </main>
  );
}
