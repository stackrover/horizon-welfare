"use client";

import { EventSubscriptionModal, Loader } from "@/components";
import { SectionWrapper } from "@/components/custom/SectionWrapper";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
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
import { useParams } from "next/navigation";
import { getImageURL } from "../../../lib/utils";

export function EventDetails() {
  const { eventId } = useParams();
  const { data, isLoading, isError } = useSWR(`/event/show/${eventId}`);

  if (isLoading) {
    return <Loader className="h-screen" />;
  }

  const serializedData = new EventDetail(data?.data?.results);

  return (
    <main className="mx-auto max-w-[992px]">
      <SectionWrapper
        isLoading={isLoading}
        isError={isError}
        errorClass="h-screen"
        loadingClass="h-screen"
        className="mt-20"
        hidden={data?.data?.results?.length === 0}
      >
        <h1 className="mb-2 text-5xl font-bold leading-[54px] text-base-400">
          {serializedData.title}
        </h1>
        <h4 className="mb-8 text-2xl font-semibold leading-10 text-base-300">
          {serializedData.createdAt
            ? format(new Date(serializedData.createdAt), "EEEE, dd MMMM yyyy")
            : ""}
        </h4>
        <Image
          src={getImageURL(serializedData.thumbnail)}
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
          />

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

        <div
          className="mt-10 space-y-4 text-base-400"
          dangerouslySetInnerHTML={{ __html: serializedData.description }}
        ></div>

        <div className="mt-10 flex flex-col gap-6">
          <h5 className="text-lg font-bold">Documents</h5>

          <div className="grid grid-cols-3 gap-4">
            {serializedData?.documents?.length > 0
              ? serializedData.documents.map((doc) => (
                  <Drawer key={doc.id}>
                    <DrawerTrigger className="flex aspect-square w-full items-center justify-center rounded-md bg-base-50 text-base-300 shadow-sm hover:bg-base-100">
                      <IconFileTypeDoc size={32} />
                    </DrawerTrigger>
                    <DrawerContent className="h-[calc(100vh-50px)]">
                      <DrawerHeader>
                        <DialogTitle className="hidden">
                          <DialogDescription></DialogDescription>
                        </DialogTitle>
                        <DrawerClose asChild className="absolute right-2 top-2">
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
                          src={getImageURL(doc?.link)}
                          className="h-full w-full border-0"
                        />
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
          <EventSubscriptionModal eventId={serializedData.id} />
        </div>
      </SectionWrapper>
    </main>
  );
}
