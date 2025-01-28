"use client";

import { Loader } from "@/components/custom/Loader";
import { SectionWrapper } from "@/components/custom/SectionWrapper";
import EditableContent from "@/components/forms/EditableContent";
import { Button } from "@/components/ui/button";
import { ProjectHeroSection } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn, getImageURL } from "@/lib/utils";
import _ from "lodash";
import Image from "next/image";
import toast from "react-hot-toast";
import FormWrapper from "@/components/forms/FormWrapper";
import Link from "next/link";
import { config } from "@/utils/config";

export function PackageHeroSection({
  editable = false,
  className,
}: {
  editable?: boolean;
  className?: string;
}) {
  console.log({
    config: config.get("app.url"),
    env: process.env["NEXT_PUBLIC_APP_URL"],
  });

  const { data, isLoading, isError, refresh } = useSWR(
    "/donate/page/hero/show",
  );

  if (isLoading) {
    return <Loader className="h-[540px]" />;
  }

  const serializedData = new ProjectHeroSection(_.head(data?.data?.results));

  return (
    <FormWrapper
      defaultValues={{
        ...serializedData.getFormData(),
        image: undefined,
      }}
      onSubmit={async (values: any) => {
        const res = await serializedData.updateData(values);
        if (res.status === "success") {
          toast.success(res.message);
          refresh();
        } else {
          console.log({ res });
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
        className={cn("bg-[#CEF4FF] py-10 @container mlg:py-[80px]", className)}
      >
        <div className="mx-auto grid max-w-7xl gap-6 px-4 @4xl:grid-cols-2">
          <div>
            <h4 className="mb-6 text-base font-bold leading-[18px] text-base-400">
              <EditableContent
                name={serializedData.getInputName("title")}
                content={serializedData.title}
                type="text"
                editable={editable}
              />
            </h4>
            <h1 className="mb-6 text-3xl font-bold text-base-400 @4xl:mb-10 @4xl:text-5xl @5xl:text-[56px] @5xl:leading-[68px]">
              <EditableContent
                name={serializedData.getInputName("focusTitle")}
                content={serializedData.focusTitle}
                type="text"
                editable={editable}
              />
            </h1>

            <EditableContent
              name={serializedData.getInputName("description")}
              content={serializedData.description}
              type="text"
              editable={editable}
            >
              <p className="mb-4 text-base leading-[26px] text-base-300">
                {serializedData.description}
              </p>
            </EditableContent>
            <EditableContent
              type="text"
              name={serializedData.getInputName("btnLink")}
              content={serializedData.btnLink}
              editable={editable}
              className="w-fit"
            >
              <Button className="rounded-sm" asChild>
                <Link
                  href={serializedData.btnLink}
                  onClick={(e) => editable && e.preventDefault()}
                >
                  <EditableContent
                    name={serializedData.getInputName("btnTitle")}
                    type="text"
                    content={serializedData.btnTitle}
                    editable={editable}
                  />
                </Link>
              </Button>
            </EditableContent>
          </div>
          <div className="flex justify-end">
            <EditableContent
              type="file"
              editable={editable}
              name={serializedData.getInputName("image")}
              content={getImageURL(serializedData.image)}
            >
              <Image
                src={getImageURL(serializedData.image)}
                alt="Donate"
                width={552}
                height={419}
                className="h-fit w-full"
              />
            </EditableContent>
          </div>
        </div>
      </SectionWrapper>
    </FormWrapper>
  );
}
