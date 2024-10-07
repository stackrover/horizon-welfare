import Image from "next/image";

export function VideoCard() {
  return (
    <div className="flex flex-col gap-y-4">
      <Image
        src="/images/banner.png"
        className="h-[200px] w-full"
        alt="video-card"
        width={290}
        height={200}
      />
      <h2 className="text-base font-semibold leading-5 text-base-400">
        Water Well pump Installation in Rangpur mitha pukur
      </h2>
    </div>
  );
}
