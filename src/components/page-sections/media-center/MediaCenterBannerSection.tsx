"use client";

import { Loader, SectionWrapper } from "@/components";
import EditableContent from "@/components/forms/EditableContent";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MediaCenterBanner } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn, getImageURL } from "@/lib/utils";
import { IconX } from "@tabler/icons-react";
import _ from "lodash";
import Link from "next/link";
import toast from "react-hot-toast";
import PlayerIcon from "../../../../public/icons/PlayerIcon";
import FormWrapper from "../../forms/FormWrapper";
import VideoPlayer from "../VideoPlayer";

export function MediaCenterBannerSection({
  className,
  editable = false,
}: {
  className?: string;
  editable?: boolean;
}) {
  const { data, isLoading, isError, refresh } = useSWR("/media/page/cta/show");

  if (isLoading) {
    return <Loader className="h-[630px]" />;
  }

  const serializedData = new MediaCenterBanner(_.head(data?.data?.results));

  return (
    <SectionWrapper
      isLoading={isLoading}
      isError={isError}
      errorClass="h-[630px]"
      loadingClass="h-[630px]"
      hidden={
        serializedData.status !== "active" || data?.data?.results?.length === 0
      }
      className={cn("relative", className)}
    >
      <FormWrapper
        defaultValues={{
          ...serializedData.getFormData(),
          image: undefined,
        }}
        onSubmit={async (values) => {
          toast.promise(serializedData.updateData(values), {
            loading: "Loading...",
            success: (res) => {
              refresh();
              return res.message;
            },
            error: (res) => res.message,
          });
        }}
      >
        <EditableContent
          type="file"
          name={serializedData.getInputName("image")}
          content={getImageURL(serializedData.image)}
          editable={editable}
          className="p-0"
        >
          <div
            className="flex h-[700px] items-center bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url("${getImageURL(serializedData.image)}")`,
            }}
          >
            <div className="container flex w-full flex-col gap-y-4 rounded-lg bg-base-0/80 p-8 backdrop-blur-[5px] lg:left-[10%] lg:max-w-[728px] lg:-translate-x-0">
              <h1 className="text-3xl font-bold text-primary md:text-4xl xmd:text-5xl xmd:leading-[72px] xl:text-6xl">
                <EditableContent
                  type="text"
                  name={serializedData.getInputName("title")}
                  content={serializedData.title}
                  editable={editable}
                />
              </h1>
              <EditableContent
                type="textarea"
                name={serializedData.getInputName("description")}
                content={serializedData.description}
                editable={editable}
              >
                <p className="text-base font-normal leading-5 text-base-400">
                  {serializedData.description}
                </p>
              </EditableContent>
              <div className="flex flex-col items-center gap-4 md:flex-row">
                <EditableContent
                  type="text"
                  name={serializedData.getInputName("donateNowBtnLink")}
                  content={serializedData.donateNowBtnLink}
                  editable={editable}
                  className="w-fit"
                >
                  <Link
                    href={serializedData.donateNowBtnLink}
                    onClick={(e) => e.preventDefault()}
                  >
                    <Button
                      type="button"
                      className="h-10 w-full rounded-full px-4 text-base sm:h-[55px] sm:w-fit sm:px-8 sm:text-lg"
                      asChild={editable}
                    >
                      <EditableContent
                        type="text"
                        name={serializedData.getInputName("donateNowBtnTitle")}
                        content={serializedData.donateNowBtnTitle}
                        editable={editable}
                      />
                    </Button>
                  </Link>
                </EditableContent>

                <Drawer>
                  <DrawerTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="group h-10 w-fit gap-x-2 rounded-full px-4 text-base sm:h-[55px] sm:px-8 sm:text-lg"
                      asChild={editable}
                    >
                      <EditableContent
                        type="text"
                        name={serializedData.getInputName("watchVideoBtnLink")}
                        content={serializedData.watchVideoBtnLink}
                        editable={editable}
                      >
                        <PlayerIcon className="h-6 w-6 fill-primary group-hover:fill-base-0" />
                        <span>{serializedData.watchVideoBtnTitle}</span>
                      </EditableContent>
                    </Button>
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
                    <div className="flex h-full items-center justify-center bg-black pt-2 sm:pt-4">
                      <VideoPlayer
                        className="max-w-[1280px] px-2 sm:px-4"
                        playerHeight="100%"
                        videoUrl={serializedData.watchVideoBtnLink}
                      />
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
          </div>
        </EditableContent>
      </FormWrapper>
    </SectionWrapper>
  );
}
