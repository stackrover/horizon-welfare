import { AboutCardProps } from "@/types/types";
import Image from "next/image";

export function AboutCard({ imageUrl, title, desc }: AboutCardProps) {
  return (
    <div className="rounded-[10px] px-20 py-8 shadow-[2px_9px_42px_rgba(0,0,0,0.04)]">
      <div className="flex items-end gap-x-6">
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${imageUrl}`}
          alt="service image"
          width={200}
          height={200}
          className="h-[70px] w-[70px]"
        />

        <h3 className="text-[40px] font-bold leading-8 text-base-400">
          {title}
        </h3>
      </div>
      <CardDivider />
      <h5 className="text-xl leading-8 text-base-300">{desc}</h5>
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
