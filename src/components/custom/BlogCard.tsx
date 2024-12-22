import { TruncateString } from "@/components";
import { BlogCardProps } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function BlogCard({ cardData }: { cardData: BlogCardProps }) {
  return (
    <div className="group overflow-hidden rounded-xl border border-[#E8E8EA] p-4">
      <div className="mb-4 overflow-hidden rounded-lg 3xl:m-2">
        <Image
          src={cardData.imageUrl}
          alt="Donation"
          loading="lazy"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Vg8AAnEBdzTCX3oAAAAASUVORK5CYII="
          placeholder="blur"
          className="h-[240px] w-full transition-all duration-300 ease-in-out group-hover:scale-105"
          height={240}
          width={500}
        />
      </div>
      <div className="flex flex-col gap-y-2 sm:gap-y-4 3xl:p-2">
        <span className="block w-fit rounded-[6px] bg-[#4B6BFB]/5 px-2.5 py-1 text-sm font-medium leading-5 text-[#4B6BFB]">
          WASH
        </span>
        <h3 className="text-base font-semibold leading-8 text-base-400 sm:text-xl 3xl:text-2xl">
          <Link href={`/blogs/1`} className="transition-all hover:text-primary">
            <TruncateString length={50} separator="">
              {cardData.title}
            </TruncateString>
          </Link>
        </h3>
        <div className="flex items-center justify-between text-[#97989F]">
          <div className="flex items-center gap-x-3 font-medium">
            <Avatar className="h-8 w-8 border border-neutral-200 text-foreground sm:h-10 sm:w-10">
              <AvatarImage src="" />
              <AvatarFallback className="text-sm font-semibold sm:text-base sm:font-bold">
                TR
              </AvatarFallback>
            </Avatar>
            <h4 className="text-base font-medium leading-6 text-base-300 sm:text-lg">
              {cardData.userName}
            </h4>
          </div>
          <h4 className="text-sm font-medium sm:text-base">
            {cardData.publishingDate}
          </h4>
        </div>
      </div>
    </div>
  );
}
