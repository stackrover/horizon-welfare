"use client";

import { SpecialNeedCardProps } from "@/types/types";
import Image from "next/image";
import { getImageURL } from "../../lib/utils";
import EditableContent from "../forms/EditableContent";

export function SpecialNeedCard({
  iconUrl,
  title,
  text,
  serializedData,
  editable,
  descInputName,
  titleInputName,
  imageInputName,
}: SpecialNeedCardProps) {
  return (
    <div className="flex items-start justify-start gap-x-4">
      <div>
        <EditableContent
          name={serializedData.getInputName(imageInputName)}
          content={getImageURL(iconUrl)}
          editable={editable}
          type="file"
        >
          <Image
            src={getImageURL(iconUrl)}
            alt="Banner"
            className="h-7 w-fit min-w-7"
            width={100}
            height={100}
          />
        </EditableContent>
      </div>
      <div className="flex flex-col gap-y-2">
        <h3 className="text-xl font-bold leading-7 text-base-0 sm:text-2xl">
          <EditableContent
            name={serializedData.getInputName(titleInputName)}
            content={title}
            editable={editable}
          />
        </h3>
        <h6 className="text-sm font-normal leading-[22px] text-base-200">
          <EditableContent
            name={serializedData.getInputName(descInputName)}
            content={text}
            editable={editable}
          />
        </h6>
      </div>
    </div>
  );
}
