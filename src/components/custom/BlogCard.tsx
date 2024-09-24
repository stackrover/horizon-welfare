import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type CardData = {
  imageUrl: string;
  title: string;
  userImgUrl: string;
  userName: string;
  publishingDate: string;
};

export function BlogCard({ cardData }: { cardData: CardData }) {
  return (
    <div className="group overflow-hidden rounded-xl border border-[#E8E8EA] p-4">
      <div className="m-2 overflow-hidden rounded-lg pb-4">
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
      <div className="flex flex-col gap-y-4 p-2">
        <span className="block w-fit rounded-[6px] bg-[#4B6BFB]/5 px-2.5 py-1 text-sm font-medium leading-5 text-[#4B6BFB]">
          WASH
        </span>
        <h3 className="text-2xl font-semibold leading-8 text-base-400">
          {cardData.title}
        </h3>
        <div className="flex items-center justify-between text-[#97989F]">
          <div className="flex items-center gap-x-3 font-medium">
            <Avatar className="border border-neutral-200 text-foreground">
              <AvatarImage src="" />
              <AvatarFallback className="font-bold">TR</AvatarFallback>
            </Avatar>
            <h4 className="text-lg font-medium leading-6 text-base-300">
              {cardData.userName}
            </h4>
          </div>
          <h4 className="font-medium">{cardData.publishingDate}</h4>
        </div>
      </div>
    </div>
  );
}
