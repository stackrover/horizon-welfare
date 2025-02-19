"use client";

import { SectionWrapper } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { VideoGalleryHero } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn, getImageURL } from "@/lib/utils";
import { IconX } from "@tabler/icons-react";
import _ from "lodash";
import Link from "next/link";
import PlayerIcon from "../../../../public/icons/PlayerIcon";
import EditableContent from "@/components/forms/EditableContent";
import FormWrapper from "@/components/forms/FormWrapper";
import VideoPlayer from "../VideoPlayer";
import toast from "react-hot-toast";

export function VideoGalleryHeroSection({
  className,
  editable = false,
}: {
  className?: string;
  editable?: boolean;
}) {
  const { data, isLoading, isError, refresh } = useSWR("/video/page/hero/show");

  const content = new VideoGalleryHero(_.head(data?.data?.results));

  return (
    <SectionWrapper
      isLoading={isLoading}
      isError={isError}
      errorClass="h-[630px]"
      loadingClass="h-[630px]"
      hidden={content.status !== "active" || data?.data?.results?.length === 0}
      className={cn("relative", className)}
    >
      <FormWrapper
        defaultValues={{
          ...content.getFormData(),
          image: undefined,
        }}
        onSubmit={async (values) => {
          toast.promise(content.updateData(values), {
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
          name={content.getInputName("image")}
          type="file"
          content={getImageURL(content.image)}
          editable={editable}
        >
          <div
            className="flex h-[700px] items-center"
            style={{
              backgroundImage: `url(${getImageURL(content.image)})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="container px-20">
              <div className="flex h-fit max-w-[728px] flex-col gap-y-4 rounded-lg bg-base-0/80 p-8 backdrop-blur-[5px]">
                <h1 className="text-6xl font-bold leading-[72px] text-primary">
                  <EditableContent
                    type="text"
                    name={content.getInputName("title")}
                    content={content.title}
                    editable={editable}
                  />
                </h1>

                <EditableContent
                  type="textarea"
                  name={content.getInputName("description")}
                  content={content.description}
                  editable={editable}
                >
                  <p className="text-base font-normal leading-5 text-base-400">
                    {content.description}
                  </p>
                </EditableContent>

                <div className="flex items-center gap-4">
                  <EditableContent
                    type="text"
                    name={content.getInputName("donateBtnLink")}
                    content={content.donateBtnLink}
                    editable={editable}
                  >
                    <Link
                      href={content.donateBtnLink}
                      onClick={(e) => editable && e.preventDefault()}
                    >
                      <Button
                        type="button"
                        className="h-[55px] rounded-full px-8 text-lg"
                        asChild={editable}
                      >
                        <EditableContent
                          type="text"
                          name={content.getInputName("donateBtnTitle")}
                          content={content.donateBtnTitle}
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
                      >
                        <PlayerIcon className="h-6 w-6 fill-primary group-hover:fill-base-0" />
                        <span>{content.videoBtnTitle}</span>
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
                          videoUrl={content.videoBtnLink}
                        />
                      </div>
                    </DrawerContent>
                  </Drawer>
                </div>
              </div>
            </div>
          </div>
        </EditableContent>
      </FormWrapper>
    </SectionWrapper>
  );
}
