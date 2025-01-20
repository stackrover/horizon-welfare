"use client";

import { Loader } from "@/components";
import { SectionWrapper } from "@/components/custom/SectionWrapper";
import { WhatWeDoHero } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn, getImageURL } from "@/lib/utils";
import _ from "lodash";
import Image from "next/image";
import EditableContent from "../../forms/EditableContent";
import FormWrapper from "../../forms/FormWrapper";
import toast from "react-hot-toast";

export function WhatWeDoHeroSection({
  className,
  editable = false,
}: {
  className?: string;
  editable?: boolean;
}) {
  const { data, isLoading, isError, refresh } = useSWR(
    "/what/we/do/page/hero/show",
  );

  if (isLoading) {
    return <Loader className="h-[540px]" />;
  }

  const serializedData = new WhatWeDoHero(_.head(data?.data?.results));

  return (
    <FormWrapper
      defaultValues={{
        ...serializedData.getFormData(),
        image: undefined,
      }}
      onSubmit={async (values) => {
        toast.promise(serializedData.updateData(values), {
          loading: "Loading...",
          success: (res) => res.message,
          error: (res) => res.message,
        });

        // const res = await serializedData.updateData(values);
        // if (res.status === "success") {
        //   toast.success(res.message);
        //   refresh();
        // }
      }}
    >
      <SectionWrapper
        isLoading={isLoading}
        isError={isError}
        errorClass="h-[540px]"
        loadingClass="h-[540px]"
        hidden={
          serializedData.status !== "active" ||
          data?.data?.results?.length === 0
        }
        className={cn(
          "mx-auto mt-10 grid max-w-7xl gap-y-8 px-4 xmd:mt-[150px] xmd:grid-cols-2",
          className,
        )}
      >
        <div className="flex max-w-xl flex-col justify-center gap-y-6">
          <h5 className="text-base font-bold leading-[18px] text-base-400">
            <EditableContent
              name={serializedData.getInputName("title")}
              content={serializedData.title}
              editable={editable}
            />
          </h5>
          <h1 className="text-4xl font-bold text-base-400 xmd:text-5xl xl:text-[56px] xl:leading-[68px]">
            <EditableContent
              name={serializedData.getInputName("focusTitle")}
              content={serializedData.focusTitle}
              editable={editable}
            />
          </h1>
          <h5 className="text-base font-normal leading-6 text-base-300">
            <EditableContent
              name={serializedData.getInputName("description")}
              content={serializedData.description}
              editable={editable}
              type="textarea"
            />
          </h5>
        </div>
        <div className="relative flex justify-end border">
          <EditableContent
            name={serializedData.getInputName("image")}
            content={getImageURL(serializedData.image)}
            type="file"
            editable={editable}
          >
            <Image
              src={getImageURL(serializedData.image)}
              alt="What We Do"
              height={384}
              width={476}
              style={{ width: "100%", height: "100%" }}
              priority
              className="h-full w-full object-cover"
            />
          </EditableContent>
        </div>
      </SectionWrapper>
    </FormWrapper>
  );
}
