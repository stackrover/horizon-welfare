"use client";

import { Loader, NewsCard, SectionWrapper } from "@/components";
import EditableContent from "@/components/forms/EditableContent";
import FormWrapper from "@/components/forms/FormWrapper";
import { Button } from "@/components/ui/button";
import { MediaCenterHero } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn } from "@/lib/utils";
import _ from "lodash";
import toast from "react-hot-toast";

export function MediaCenterHeroSection({
  className,
  editable = false,
}: {
  className?: string;
  editable?: boolean;
}) {
  const { data, isLoading, isError, refresh } = useSWR("/media/page/hero/show");

  console.log(data);

  if (isLoading) {
    return <Loader className="h-[800px]" />;
  }

  const serializedData = new MediaCenterHero(_.head(data?.data?.results));

  return (
    <SectionWrapper
      isLoading={isLoading}
      isError={isError}
      errorClass="h-[800px]"
      loadingClass="h-[800px]"
      hidden={data?.data?.results?.length === 0}
      className={cn("bg-[#CEF4FF] px-4 py-[80px]", className)}
    >
      <FormWrapper
        defaultValues={{
          ...serializedData.getFormData(),
          news_1: serializedData.news1.id?.toString(),
          news_2: serializedData.news2.id?.toString(),
          news_3: serializedData.news3.id?.toString(),
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
        <div className="mx-auto grid max-w-7xl gap-4 mlg:grid-cols-2">
          <div>
            <h4 className="mb-3 text-base font-bold leading-[18px] text-base-400 xmd:mb-6">
              <EditableContent
                type="text"
                name={serializedData.getInputName("title")}
                content={serializedData.title}
                editable={editable}
              />
            </h4>
            <h1 className="mb-6 text-3xl font-bold text-base-400 xmd:mb-10 mlg:text-5xl mlg:leading-[68px] 2xl:text-[56px]">
              <EditableContent
                type="text"
                name={serializedData.getInputName("focusTitle")}
                content={serializedData.focusTitle}
                editable={editable}
              />
            </h1>
            <EditableContent
              type="textarea"
              name={serializedData.getInputName("description")}
              content={serializedData.description}
              editable={editable}
            >
              <p className="mb-4 text-base leading-[26px] text-base-300">
                {serializedData.description}
              </p>
            </EditableContent>
            <Button className="rounded-sm">Read More</Button>
          </div>
          <div className="flex flex-col gap-y-6 rounded-[20px] bg-base-0 p-6">
            <EditableContent
              type="blogSelection"
              name={serializedData.getInputName("news1")}
              content={serializedData.news1.id?.toString()}
              editable={editable}
            >
              <NewsCard
                title={serializedData.news1.title}
                date={serializedData.news1.createdAt}
                description={serializedData.news1.description}
                image={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}${serializedData.news1.thumbnail}`}
              />
            </EditableContent>

            <EditableContent
              type="blogSelection"
              name={serializedData.getInputName("news2")}
              content={serializedData.news1.id?.toString()}
              editable={editable}
            >
              <NewsCard
                title={serializedData.news2.title}
                date={serializedData.news2.createdAt}
                description={serializedData.news2.description}
                image={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}${serializedData.news2.thumbnail}`}
              />
            </EditableContent>

            <EditableContent
              type="blogSelection"
              name={serializedData.getInputName("news3")}
              content={serializedData.news1.id?.toString()}
              editable={editable}
            >
              <NewsCard
                title={serializedData.news3.title}
                date={serializedData.news3.createdAt}
                description={serializedData.news3.description}
                image={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}${serializedData.news3.thumbnail}`}
              />
            </EditableContent>
          </div>
        </div>
      </FormWrapper>
    </SectionWrapper>
  );
}
