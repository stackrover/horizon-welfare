import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StoryCardProps } from "@/types/types";
import { IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export function StoryCard({
  title,
  subtext,
  link,
  className,
  image,
}: StoryCardProps) {
  return (
    <div className={cn(`group relative overflow-hidden`, className)}>
      <div className="from-black via-black/0 to-black/0 bg-cover bg-center transition-all duration-300 ease-in-out before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-gradient-to-t before:content-[''] group-hover:scale-110">
        <Image
          src={image}
          alt="image"
          height={366}
          width={435}
          className="h-[366px] w-full"
        />
      </div>
      <div className="absolute bottom-0 left-0 z-10 mx-auto w-full gap-y-8 p-8">
        <h1 className="mb-2 text-xl font-semibold leading-6 text-base-0">
          {title}
        </h1>
        <h5 className="mb-4 text-sm leading-[18px] text-base-200">{subtext}</h5>
        <Link href={link}>
          <Button
            className="h-fit gap-x-2 px-0 py-0 font-bold text-destructive"
            variant="link"
          >
            <span>VISIT PROJECT</span>
            <IconArrowRight size={20} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
