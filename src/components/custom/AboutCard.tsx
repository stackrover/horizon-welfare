import { AboutCardProps } from "@/types/types";
import Image from "next/image";

export function AboutCard({ imageUrl, title, desc }: AboutCardProps) {
  return (
    <div className="rounded-[10px] px-4 py-4 shadow-[2px_9px_42px_rgba(0,0,0,0.04)] md:px-8 md:py-8 3xl:px-20">
      <div className="flex items-end gap-x-6">
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${imageUrl}`}
          alt="service image"
          width={200}
          height={200}
          className="h-[55px] w-[55px] md:h-[70px] md:w-[70px]"
        />

        <h3 className="text-2xl font-bold text-base-400 md:text-3xl md:leading-10 3xl:text-[40px]">
          {title}
        </h3>
      </div>
      <CardDivider />
      <h5 className="text-base leading-8 text-base-300 sm:text-lg xmd:text-xl">
        {desc}
      </h5>
    </div>
  );
}

function CardDivider() {
  return (
    <div className="my-6 flex items-center">
      <div className="h-[2px] min-w-[74px] bg-primary" />
      <div className="h-[1px] w-full flex-1 bg-border" />
    </div>
  );
}
