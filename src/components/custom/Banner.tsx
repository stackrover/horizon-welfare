import { Button } from "@/components/ui/button";
import Image from "next/image";
import PlayerIcon from "../../../public/icons/PlayerIcon";

export function Banner() {
  return (
    <section className="relative">
      <Image
        src="/images/banner.png"
        alt="Banner"
        className="max-h-[808px] w-full"
        width={1800}
        height={800}
        priority
      />
      <div className="absolute left-60 top-1/2 flex max-w-[728px] -translate-y-1/2 flex-col gap-y-4 rounded-lg bg-base-0 p-4 opacity-80">
        <h1 className="text-6xl font-bold leading-[72px] text-primary">
          Happiness comes from your action.
        </h1>
        <p className="text-base font-normal leading-5 text-base-400">
          Be a part of the breakthrough and make someone’s dream come true.
        </p>
        <div className="flex items-center gap-4">
          <Button type="button" className="h-[55px] rounded-full px-8 text-lg">
            Donate Now
          </Button>
          <Button
            type="button"
            variant="outline"
            className="group h-[55px] gap-x-2 rounded-full px-8 text-lg"
          >
            <PlayerIcon className="h-6 w-6 fill-primary group-hover:fill-base-0" />
            <span>Watch Video</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
