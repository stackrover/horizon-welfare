"use client";

import { Separator } from "@/components/ui/separator";
import { SingleProject } from "@/data";
import { IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { getImageURL } from "../../lib/utils";
import EditableContent from "../forms/EditableContent";
import FormWrapper from "../forms/FormWrapper";
import { Button } from "../ui/button";

export function Project({
  data,
  refresh,
  editable = false,
}: {
  data: any;
  refresh: VoidFunction;
  editable?: boolean;
}) {
  const project: SingleProject = new SingleProject(data);

  return (
    <FormWrapper
      defaultValues={{
        ...project.getFormData(),
        icon: undefined,
      }}
      onSubmit={async (values: any) => {
        const res = await project.updateData(values);
        if (res.status === "success") {
          toast.success(res.message);
          refresh();
        } else {
          console.log({ res });
          toast.error(res.message);
        }
      }}
    >
      <div className="rounded border p-4 shadow-sm">
        <div className="flex items-center gap-x-6">
          <EditableContent
            type="file"
            name={project.getInputName("icon")}
            content={getImageURL(project.icon)}
            editable={editable}
            className="w-fit"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}${project.icon}`}
              alt="project image"
              width={120}
              height={120}
              className="h-[100px] w-[100px] sm:h-[120px] sm:w-fit"
            />
          </EditableContent>
          <h2 className="text-xl font-bold leading-6 text-base-400">
            <EditableContent
              type="text"
              name={project.getInputName("title")}
              content={project.title}
              editable={editable}
            />
          </h2>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-center">
          <Button
            className="gap-x-2 font-bold text-destructive"
            variant="link"
            asChild
          >
            <Link
              href={`/projects/category/${project.id}`}
              onClick={(e) => editable && e.preventDefault()}
            >
              <span>VISIT PROJECT</span>
              <IconArrowRight size={20} />
            </Link>
          </Button>
        </div>
      </div>
    </FormWrapper>
  );
}
