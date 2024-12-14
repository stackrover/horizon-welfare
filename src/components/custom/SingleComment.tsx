import { SingleCommentProps } from "@/types/types";
import Image from "next/image";

export function SingleComment({
  image,
  name,
  date,
  comment,
}: SingleCommentProps) {
  return (
    <div className="flex items-start gap-4">
      <Image
        src={image}
        alt="blog image"
        width={50}
        height={50}
        className="h-10 w-10 rounded-full"
      />
      <div className="rounded-[10px] bg-[#EFF2FC] p-4">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-bold leading-6 text-base-400 md:text-base">
            {name}
          </h4>
          <h5 className="text-sm font-normal leading-[22px] text-base-300">
            {date}
          </h5>
        </div>
        <p className="mt-4 text-sm font-normal leading-6 text-base-400 md:text-base">
          {comment}
        </p>
      </div>
    </div>
  );
}
