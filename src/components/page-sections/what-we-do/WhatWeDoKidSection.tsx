"use client";

import { Loader, SectionWrapper, SpecialNeedCard } from "@/components";
import { WhatWeDoKid } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn } from "@/lib/utils";
import _ from "lodash";
import toast from "react-hot-toast";
import EditableContent from "../../forms/EditableContent";
import FormWrapper from "../../forms/FormWrapper";

export function WhatWeDoKidSection({
  className,
  editable = false,
}: {
  className?: string;
  editable?: boolean;
}) {
  const { data, isLoading, isError, refresh } = useSWR(
    "/what/we/do/page/kid/show",
  );

  if (isLoading) {
    return <Loader className="h-[540px]" />;
  }

  const serializedData = new WhatWeDoKid(_.head(data?.data?.results));

  return (
    <FormWrapper
      defaultValues={{
        ...serializedData.getFormData(),
        service_icon_1: undefined,
        service_icon_2: undefined,
        service_icon_3: undefined,
        service_icon_4: undefined,
        service_icon_5: undefined,
        service_icon_6: undefined,
      }}
      onSubmit={async (values) => {
        const res = await serializedData.updateData(values);

        if (res.status === "success") {
          toast.success(res.message);
          refresh();
        }

        if (res.status === "error") {
          toast.error(res.message);
        }
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
          "container mt-[100px] rounded-lg bg-gradient-to-r from-primary-light to-primary p-10 2xl:p-[80px]",
          className,
        )}
      >
        <h1 className="text-3xl font-bold text-base-0 xmd:text-4xl xmd:leading-[56px] xl:text-5xl">
          <EditableContent
            name={serializedData.getInputName("title")}
            content={serializedData.title}
            editable={editable}
          />
        </h1>
        <div className="mt-[60px] grid gap-x-4 gap-y-6 md:grid-cols-2 mlg:grid-cols-3 lg:gap-y-12">
          <SpecialNeedCard
            iconUrl={serializedData.serviceIcon1}
            title={serializedData.serviceTitle1}
            text={serializedData.serviceDescription1}
            serializedData={serializedData}
            editable={editable}
            imageInputName="serviceIcon1"
            titleInputName="serviceTitle1"
            descInputName="serviceDescription1"
          />
          <SpecialNeedCard
            iconUrl={serializedData.serviceIcon2}
            title={serializedData.serviceTitle2}
            text={serializedData.serviceDescription2}
            serializedData={serializedData}
            editable={editable}
            titleInputName="serviceTitle2"
            imageInputName="serviceIcon2"
            descInputName="serviceDescription2"
          />
          <SpecialNeedCard
            iconUrl={serializedData.serviceIcon3}
            title={serializedData.serviceTitle3}
            text={serializedData.serviceDescription3}
            serializedData={serializedData}
            editable={editable}
            titleInputName="serviceTitle3"
            imageInputName="serviceIcon3"
            descInputName="serviceDescription3"
          />
          <SpecialNeedCard
            iconUrl={serializedData.serviceIcon4}
            title={serializedData.serviceTitle4}
            text={serializedData.serviceDescription4}
            serializedData={serializedData}
            editable={editable}
            titleInputName="serviceTitle4"
            imageInputName="serviceIcon4"
            descInputName="serviceDescription4"
          />
          <SpecialNeedCard
            iconUrl={serializedData.serviceIcon5}
            title={serializedData.serviceTitle5}
            text={serializedData.serviceDescription5}
            serializedData={serializedData}
            editable={editable}
            titleInputName="serviceTitle5"
            imageInputName="serviceIcon5"
            descInputName="serviceDescription5"
          />
          <SpecialNeedCard
            iconUrl={serializedData.serviceIcon6}
            title={serializedData.serviceTitle6}
            text={serializedData.serviceDescription6}
            serializedData={serializedData}
            editable={editable}
            titleInputName="serviceTitle6"
            imageInputName="serviceIcon6"
            descInputName="serviceDescription6"
          />
        </div>
      </SectionWrapper>
    </FormWrapper>
  );
}
