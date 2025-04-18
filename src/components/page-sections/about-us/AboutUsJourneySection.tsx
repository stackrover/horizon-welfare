"use client";

import { Loader, OurJourneySummary, SectionWrapper } from "@/components";
import EditableContent from "@/components/forms/EditableContent";
import FormWrapper from "@/components/forms/FormWrapper";
import { AboutUsJourney } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn, getImageURL } from "@/lib/utils";
import _ from "lodash";
import Image from "next/image";
import toast from "react-hot-toast";

export function AboutUsJourneySection({
  className,
  editable = false,
}: {
  className?: string;
  editable?: boolean;
}) {
  const { data, isLoading, isError, refresh } = useSWR(
    "/about/page/journey/show",
  );

  if (isLoading) {
    return <Loader className="h-[655px]" />;
  }

  const serializedData = new AboutUsJourney(_.head(data?.data?.results));

  return (
    <SectionWrapper
      isLoading={isLoading}
      isError={isError}
      errorClass="h-[655px]"
      loadingClass="h-[655px]"
      hidden={
        serializedData.status !== "active" || data?.data?.results?.length === 0
      }
      className={cn(
        "container mt-[100px] grid grid-cols-12 gap-x-0 gap-y-8 rounded-[20px] bg-primary px-6 py-6 mlg:gap-x-4 mlg:gap-y-0 xl:px-8 xl:py-8 2xl:py-16",
        className,
      )}
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
        <div className="order-2 col-span-12 flex flex-col justify-center gap-y-4 mlg:order-1 mlg:col-span-6 2xl:ml-12">
          <EditableContent
            type="text"
            name={serializedData.getInputName("title")}
            content={serializedData.title}
            editable={editable}
          >
            <h4 className="text-base font-bold leading-5 text-base-0">
              {serializedData.title}
            </h4>
          </EditableContent>

          <EditableContent
            type="text"
            name={serializedData.getInputName("focusTitle")}
            content={serializedData.focusTitle}
            editable={editable}
          >
            <h1 className="text-4xl font-bold leading-[58px] text-base-0 2xl:text-5xl">
              {serializedData.focusTitle}
            </h1>
          </EditableContent>

          <EditableContent
            type="text"
            name={serializedData.getInputName("description")}
            content={serializedData.description}
            editable={editable}
          >
            <p className="text-base font-normal leading-6 text-base-200">
              {serializedData.description}
            </p>
          </EditableContent>

          <div className="mt-4 flex gap-x-8">
            <EditableContent
              type="text"
              name={serializedData.getInputName("donationTitle")}
              content={serializedData.donationTitle}
              editable={editable}
              className="w-fit"
            >
              <EditableContent
                type="text"
                name={serializedData.getInputName("donationCount")}
                content={serializedData.donationCount}
                editable={editable}
                className="mr-8 w-fit"
              >
                <OurJourneySummary
                  count={serializedData.donationCount}
                  text={serializedData.donationTitle}
                />
              </EditableContent>
            </EditableContent>

            <EditableContent
              type="text"
              name={serializedData.getInputName("volunteerTitle")}
              content={serializedData.volunteerTitle}
              editable={editable}
              className="w-fit"
            >
              <EditableContent
                type="text"
                name={serializedData.getInputName("volunteerCount")}
                content={serializedData.volunteerCount}
                editable={editable}
                className="mr-8 w-fit"
              >
                <OurJourneySummary
                  count={serializedData.volunteerCount}
                  text={serializedData.volunteerTitle}
                />
              </EditableContent>
            </EditableContent>

            <EditableContent
              type="text"
              name={serializedData.getInputName("homeTitle")}
              content={serializedData.homeTitle}
              editable={editable}
              className="w-fit"
            >
              <EditableContent
                type="text"
                name={serializedData.getInputName("homeCount")}
                content={serializedData.homeCount}
                editable={editable}
                className="mr-8 w-fit"
              >
                <OurJourneySummary
                  count={serializedData.homeCount}
                  text={serializedData.homeTitle}
                />
              </EditableContent>
            </EditableContent>
          </div>
        </div>
        <EditableContent
          type="file"
          name={serializedData.getInputName("image")}
          content={getImageURL(serializedData.image)}
          editable={editable}
          className="order-1 col-span-12 h-fit w-fit sm:w-full mlg:order-2 mlg:col-span-6"
        >
          <Image
            src={getImageURL(serializedData.image)}
            alt="Money-raising"
            height={350}
            width={612}
            className="order-1 col-span-12 h-fit w-fit rounded-lg sm:w-full mlg:order-2 mlg:col-span-6"
          />
        </EditableContent>
      </FormWrapper>
    </SectionWrapper>
  );
}
