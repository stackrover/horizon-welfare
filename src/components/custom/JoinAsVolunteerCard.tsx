"use client";

import { Loader, SectionWrapper } from "@/components";
import { Button } from "@/components/ui/button";
import { JoinAsVolunteer } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";
import EditableContent from "../forms/EditableContent";
import { getImageURL } from "@/lib/utils";
import FormWrapper from "../forms/FormWrapper";
import toast from "react-hot-toast";

export function JoinAsVolunteerCard({ editable }: { editable?: boolean }) {
  const { data, isLoading, isError, refresh } = useSWR("/volunteer/cta/show");

  if (isLoading) {
    return <Loader className="h-[300px]" />;
  }

  const serializedData = new JoinAsVolunteer(_.head(data?.data?.results));

  return (
    <SectionWrapper
      isLoading={isLoading}
      isError={isError}
      errorClass="h-[300px]"
      loadingClass="h-[300px]"
      hidden={
        serializedData.status !== "active" || data?.data?.results?.length === 0
      }
      className={`relative mx-4 mt-[100px] h-[384px] max-w-7xl overflow-hidden rounded-[20px] bg-cover bg-center p-0 before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-[20px] before:bg-black/50 before:content-[''] 2xl:mx-auto`}
    >
      <FormWrapper
        defaultValues={{
          ...serializedData.getFormData(),
          image: undefined,
        }}
        onSubmit={async (values: any) => {
          const res = await serializedData.updateData(values);

          if (res.status === "success") {
            refresh();
            toast.success(res.message);
          } else toast.error(res.message);
        }}
      >
        <EditableContent
          name={serializedData.getInputName("image")}
          content={getImageURL(serializedData.image)}
          type="file"
          editable={editable}
          className="p-0"
        >
          <div
            style={{
              backgroundImage: `url("${getImageURL(serializedData.image)}")`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="mx-auto flex h-[384px] w-full flex-col items-center justify-center gap-y-8 p-8">
              <h4 className="max-w-[900px] text-center text-2xl font-bold text-base-0 xmd:text-3xl mlg:text-4xl lg:leading-[58px] xl:text-5xl">
                <EditableContent
                  type="text"
                  name={serializedData.getInputName("title")}
                  content={serializedData.title}
                  editable={editable}
                />
              </h4>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <EditableContent
                  type="text"
                  name={serializedData.getInputName("volunteerBtnLink")}
                  content={serializedData.volunteerBtnLink}
                  editable={editable}
                  className="w-fit"
                >
                  <Link
                    href={serializedData.volunteerBtnLink}
                    onClick={(e) => editable && e.preventDefault()}
                  >
                    <Button className="w-fit">
                      <EditableContent
                        type="text"
                        name={serializedData.getInputName("volunteerBtnTitle")}
                        content={serializedData.volunteerBtnTitle}
                        editable={editable}
                      />
                    </Button>
                  </Link>
                </EditableContent>

                {/* Donate button */}

                <EditableContent
                  type="text"
                  name={serializedData.getInputName("donateBtnLink")}
                  content={serializedData.donateBtnLink}
                  editable={editable}
                  className="w-fit"
                >
                  <Link
                    href={serializedData.donateBtnLink}
                    onClick={(e) => editable && e.preventDefault()}
                  >
                    <Button variant="light" className="w-fit">
                      <EditableContent
                        type="text"
                        name={serializedData.getInputName("donateBtnTitle")}
                        content={serializedData.donateBtnTitle}
                        editable={editable}
                      />
                    </Button>
                  </Link>
                </EditableContent>
              </div>
            </div>
          </div>
        </EditableContent>
      </FormWrapper>
    </SectionWrapper>
  );
}
