"use client";

import { Loader, SectionWrapper } from "@/components";
import { StoryCard } from "@/components/custom/StoryCard";
import EditableContent from "@/components/forms/EditableContent";
import FormWrapper from "@/components/forms/FormWrapper";
import { Button } from "@/components/ui/button";
import { SuccessStories } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn } from "@/lib/utils";
import _ from "lodash";
import toast from "react-hot-toast";

export function SuccessStoriesSection({
  editable = false,
  className,
}: {
  editable?: boolean;
  className?: string;
}) {
  const { data, isLoading, isError, refresh } = useSWR(
    "/donate/page/success/story/show",
  );

  if (isLoading) {
    return <Loader className="h-[540px]" />;
  }

  const serializedData: SuccessStories = new SuccessStories(
    _.head(data?.data?.results),
  );

  return (
    <FormWrapper
      defaultValues={{
        ...serializedData.getFormData(),
        story_1: serializedData?.story1?.id?.toString(),
        story_2: serializedData?.story2?.id?.toString(),
        story_3: serializedData?.story3?.id?.toString(),
        story_4: serializedData?.story4?.id?.toString(),
        story_5: serializedData?.story5?.id?.toString(),
      }}
      onSubmit={async (values: any) => {
        const res = await serializedData.updateData(values);

        if (res.status === "success") {
          refresh();
          toast.success(res.message);
        } else toast.error(res.message);
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
          "container mt-[100px] grid gap-2 xmd:grid-cols-2 xl:grid-cols-3",
          className,
        )}
      >
        <div className="flex flex-col gap-y-4 mlg:p-8">
          <Button className="w-fit">
            <EditableContent
              type="text"
              name={serializedData.getInputName("title")}
              content={serializedData.title}
              editable={editable}
            />
          </Button>
          <h2 className="text-2xl font-semibold leading-[44px] text-base-400 md:text-3xl mlg:text-4xl">
            <EditableContent
              type="text"
              name={serializedData.getInputName("focusTitle")}
              content={serializedData.focusTitle}
              editable={editable}
            />
          </h2>

          <div className="text-base font-normal leading-6 text-base-300">
            <EditableContent
              type="textarea"
              name={serializedData.getInputName("description")}
              content={serializedData.description}
              editable={editable}
            />
          </div>
        </div>

        <EditableContent
          type="blogSelection"
          name={serializedData.getInputName("story1")}
          content=""
          editable={editable}
        >
          <StoryCard
            image={serializedData?.story1?.thumbnail ?? ""}
            title={serializedData?.story1?.title ?? ""}
            subtext={serializedData?.story1?.description ?? ""}
            link={`/blogs/${serializedData?.story1?.slug ?? ""}`}
          />
        </EditableContent>

        <EditableContent
          type="blogSelection"
          name={serializedData.getInputName("story2")}
          content=""
          editable={editable}
        >
          <StoryCard
            image={serializedData?.story2?.thumbnail ?? ""}
            title={serializedData?.story2?.title ?? ""}
            subtext={serializedData?.story2?.description ?? ""}
            link={`/blogs/${serializedData?.story2?.slug ?? ""}`}
          />
        </EditableContent>

        <EditableContent
          type="blogSelection"
          name={serializedData.getInputName("story3")}
          content=""
          editable={editable}
        >
          <StoryCard
            image={serializedData?.story3?.thumbnail ?? ""}
            title={serializedData?.story3?.title ?? ""}
            subtext={serializedData?.story3?.description ?? ""}
            link={`/blogs/${serializedData?.story3?.slug ?? ""}`}
          />
        </EditableContent>

        <EditableContent
          type="blogSelection"
          name={serializedData.getInputName("story4")}
          content=""
          editable={editable}
        >
          <StoryCard
            image={serializedData?.story4?.thumbnail ?? ""}
            title={serializedData?.story4?.title ?? ""}
            subtext={serializedData?.story4?.description ?? ""}
            link={`/blogs/${serializedData?.story4?.slug ?? ""}`}
          />
        </EditableContent>

        <EditableContent
          type="blogSelection"
          name={serializedData.getInputName("story5")}
          content=""
          editable={editable}
        >
          <StoryCard
            image={serializedData?.story5?.thumbnail ?? ""}
            title={serializedData?.story5?.title ?? ""}
            subtext={serializedData?.story5?.description ?? ""}
            link={`/blogs/${serializedData?.story5?.slug ?? ""}`}
          />
        </EditableContent>
      </SectionWrapper>
    </FormWrapper>
  );
}
