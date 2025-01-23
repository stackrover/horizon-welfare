import { SingleCommentProps } from "@/types/types";
import Image from "next/image";

export function SingleComment({
  image,
  name,
  date,
  comment,
}: SingleCommentProps) {
  return (
    <div className="flex w-full items-start gap-4">
      <Image
        src={image}
        alt="blog image"
        width={50}
        height={50}
        className="h-6 w-6 rounded-full sm:h-10 sm:w-10"
      />
      <div className="w-full rounded-md bg-[#EFF2FC] p-4 sm:rounded-[10px]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-2">
          <h4 className="text-xs font-bold leading-6 text-base-400 sm:text-sm md:text-base">
            {name}
          </h4>
          <h5 className="text-xs font-normal leading-[22px] text-base-300 sm:text-sm">
            {date}
          </h5>
        </div>
        <p className="mt-4 text-xs font-normal leading-6 text-base-400 sm:text-sm md:text-base">
          {comment}
        </p>
      </div>
    </div>
  );
}
