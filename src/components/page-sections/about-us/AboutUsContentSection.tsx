"use client";

import { Loader, SectionWrapper } from "@/components";
import { AboutUsContent } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn } from "@/lib/utils";
import _ from "lodash";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import EditableContent from "../../forms/EditableContent";
import FormWrapper from "../../forms/FormWrapper";

const VideoPlayer = dynamic(
  () => import("@/components/page-sections/VideoPlayer"),
  { ssr: false },
);

export function AboutUsContentSection({
  className,
  editable = false,
}: {
  className?: string;
  editable?: boolean;
}) {
  const { data, isLoading, isError, refresh } = useSWR(
    "/about/page/content/show",
  );

  if (isLoading) {
    return <Loader className="h-[800px]" />;
  }

  const serializedData = new AboutUsContent(_.head(data?.data?.results));

  return (
    <SectionWrapper
      isLoading={isLoading}
      isError={isError}
      errorClass="h-[800px]"
      loadingClass="h-[800px]"
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
        {/* know about us section  */}
        <section className="mx-4 mt-10 max-w-7xl py-4 lg:mt-[150px] 2xl:mx-auto">
          <h5 className="mb-6 text-base font-bold leading-[18px] text-base-400">
            <EditableContent
              type="text"
              name={serializedData.getInputName("title")}
              content={serializedData.title}
              editable={editable}
            />
          </h5>
          <div className="grid grid-cols-12 items-start gap-6">
            <h1 className="col-span-12 text-3xl font-bold leading-10 text-base-400 md:text-5xl md:leading-[68px] lg:col-span-8 2xl:text-[56px]">
              <EditableContent
                type="text"
                name={serializedData.getInputName("focusTitle")}
                content={serializedData.focusTitle}
                editable={editable}
                className=""
              />
            </h1>
            <div className="col-span-12 lg:col-span-4">
              <h3 className="text-xl font-bold leading-[30px] text-base-400">
                <EditableContent
                  type="text"
                  name={serializedData.getInputName("descriptionTitle")}
                  content={serializedData.descriptionTitle}
                  editable={editable}
                  className=""
                />
              </h3>
              <h5 className="text-base font-normal leading-6 text-base-300">
                <EditableContent
                  type="text"
                  name={serializedData.getInputName("description")}
                  content={serializedData.description}
                  editable={editable}
                  className=""
                />
              </h5>
            </div>
          </div>
        </section>

        {/* our mission section  */}
        <section className="container">
          <div className="translate-y-[225px] md:px-10">
            <EditableContent
              type="text"
              name={serializedData.getInputName("videoLink")}
              content={serializedData.videoLink}
              editable={editable}
              className=""
            >
              <VideoPlayer
                className="h-fit overflow-hidden rounded-xl"
                videoUrl={serializedData.videoLink}
                playerHeight="448px"
              />
            </EditableContent>
          </div>

          <div className="rounded-lg border bg-gradient-to-r from-primary-light to-primary">
            <div className="z-0 mx-auto mt-[250px] grid max-w-6xl grid-cols-1 gap-8 p-10 mlg:grid-cols-2 2xl:mb-[80px] 2xl:mt-[300px]">
              <div className="flex flex-col gap-y-4">
                <h4 className="text-base font-bold uppercase leading-5 text-base-0">
                  <EditableContent
                    type="text"
                    name={serializedData.getInputName("missionTitle")}
                    content={serializedData.missionTitle}
                    editable={editable}
                    className=""
                  />
                </h4>
                <h2 className="text-[28px] font-bold leading-[42px] text-base-0">
                  <EditableContent
                    type="text"
                    name={serializedData.getInputName("missionFocusTitle")}
                    content={serializedData.missionFocusTitle}
                    editable={editable}
                    className=""
                  />
                </h2>
                <h5 className="text-base font-normal leading-6 text-base-0">
                  <EditableContent
                    type="text"
                    name={serializedData.getInputName("missionDescription")}
                    content={serializedData.missionDescription}
                    editable={editable}
                    className=""
                  />
                </h5>
              </div>
              <div className="flex flex-col gap-y-4">
                <h4 className="text-base font-bold uppercase leading-5 text-base-0">
                  <EditableContent
                    type="text"
                    name={serializedData.getInputName("visionTitle")}
                    content={serializedData.visionTitle}
                    editable={editable}
                    className=""
                  />
                </h4>
                <h2 className="text-[28px] font-bold leading-[42px] text-base-0">
                  <EditableContent
                    type="text"
                    name={serializedData.getInputName("visionFocusTitle")}
                    content={serializedData.visionFocusTitle}
                    editable={editable}
                    className=""
                  />
                </h2>
                <h5 className="text-base font-normal leading-6 text-base-0">
                  <EditableContent
                    type="text"
                    name={serializedData.getInputName("visionDescription")}
                    content={serializedData.visionDescription}
                    editable={editable}
                    className=""
                  />
                </h5>
              </div>
            </div>
          </div>
        </section>
        {/* our mission section end  */}
      </FormWrapper>
    </SectionWrapper>
  );
}
