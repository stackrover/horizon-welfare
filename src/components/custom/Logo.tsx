import { cn, getImageURL } from "@/lib/utils";
import Image from "next/image";

export function Logo({
  imageClass,
  textClass,
  logo,
  className,
}: {
  imageClass?: string;
  textClass?: string;
  logo: string | null | undefined;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        className={cn("h-[73px] w-[132px]", imageClass)}
        height={73}
        width={132}
        priority
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Vg8AAnEBdzTCX3oAAAAASUVORK5CYII="
        src={getImageURL(logo as string)}
        alt="Logo"
      />
      <h3 className={cn("text-2xl leading-6 text-[#4ED9FF]", textClass)}>
        Horizon Welfare <br />
        Organization
      </h3>
    </div>
  );
}
