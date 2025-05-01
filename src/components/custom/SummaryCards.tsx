"use client";

import { SectionWrapper, SummaryCard } from "@/components";

import { Counter } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn, getImageURL } from "@/lib/utils";
import _ from "lodash";
import Image from "next/image";
import CountUp from "react-countup";
import toast from "react-hot-toast";
import EditableContent from "../forms/EditableContent";
import FormWrapper from "../forms/FormWrapper";

export default function SummaryCards({
  className,
  editable = false,
}: {
  className?: string;
  editable?: boolean;
}) {
  const { data, isLoading, isError, refresh } = useSWR("/counter");

  const serializedData = new Counter(_.head(data?.data?.results));

  return (
    <SectionWrapper
      isLoading={isLoading}
      isError={isError}
      errorClass="h-[300px]"
      loadingClass="h-[300px]"
      hidden={
        serializedData.status !== "active" || data?.data?.results?.length === 0
      }
      className={cn(
        "container grid grid-cols-1 gap-6 py-[80px] md:grid-cols-2 lg:grid-cols-3 3xl:gap-x-20",
        className,
      )}
    >
      <FormWrapper
        defaultValues={{
          ...serializedData.getFormData(),
          icon_1: undefined,
          icon_2: undefined,
          icon_3: undefined,
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
        <SummaryCard
          image={
            <EditableContent
              type="file"
              name={serializedData.getInputName("icon1")}
              content={getImageURL(serializedData.icon1)}
              editable={editable}
              className="aspect-square h-[80px] w-[80px] xl:h-[107px] xl:w-[107px]"
            >
              <Image
                src={getImageURL(serializedData.icon1)}
                alt="Banner"
                className="aspect-square h-[80px] w-[80px] xl:h-[107px] xl:w-[107px]"
                width={1000}
                height={100}
              />
            </EditableContent>
          }
          title={
            <EditableContent
              name={serializedData.getInputName("number1")}
              content={serializedData.number1?.toString()}
              editable={editable}
            >
              <CountUp
                enableScrollSpy={true}
                scrollSpyOnce={true}
                end={serializedData.number1}
              />
            </EditableContent>
          }
          subTitle={
            <EditableContent
              name={serializedData.getInputName("title1")}
              content={serializedData.title1}
              editable={editable}
            >
              {serializedData.title1}
            </EditableContent>
          }
        />

        <SummaryCard
          image={
            <EditableContent
              type="file"
              name={serializedData.getInputName("icon2")}
              content={getImageURL(serializedData.icon2)}
              editable={editable}
              className="aspect-square h-[80px] w-[80px] xl:h-[107px] xl:w-[107px]"
            >
              <Image
                src={getImageURL(serializedData.icon2)}
                alt="Banner"
                className="aspect-square h-[80px] w-[80px] xl:h-[107px] xl:w-[107px]"
                width={1000}
                height={100}
              />
            </EditableContent>
          }
          title={
            <EditableContent
              name={serializedData.getInputName("number2")}
              content={serializedData.number2?.toString()}
              editable={editable}
            >
              <CountUp
                enableScrollSpy={true}
                scrollSpyOnce={true}
                end={serializedData.number2}
              />
            </EditableContent>
          }
          subTitle={
            <EditableContent
              name={serializedData.getInputName("title2")}
              content={serializedData.title2}
              editable={editable}
            >
              {serializedData.title2}
            </EditableContent>
          }
        />

        <SummaryCard
          image={
            <EditableContent
              type="file"
              name={serializedData.getInputName("icon3")}
              content={getImageURL(serializedData.icon3)}
              editable={editable}
              className="aspect-square h-[80px] w-[80px] xl:h-[107px] xl:w-[107px]"
            >
              <Image
                src={getImageURL(serializedData.icon3)}
                alt="Banner"
                className="aspect-square h-[80px] w-[80px] xl:h-[107px] xl:w-[107px]"
                width={1000}
                height={100}
              />
            </EditableContent>
          }
          title={
            <EditableContent
              name={serializedData.getInputName("number3")}
              content={serializedData.number3?.toString()}
              editable={editable}
            >
              <CountUp
                enableScrollSpy={true}
                scrollSpyOnce={true}
                end={serializedData.number3}
              />
            </EditableContent>
          }
          subTitle={
            <EditableContent
              name={serializedData.getInputName("title3")}
              content={serializedData.title3}
              editable={editable}
            >
              {serializedData.title3}
            </EditableContent>
          }
        />
      </FormWrapper>
    </SectionWrapper>
  );
}
