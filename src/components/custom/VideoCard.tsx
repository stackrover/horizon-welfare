"use client";

import { VideoCardProps } from "@/types/types";
import ReactPlayer from "react-player";

export function VideoCard({ videoUrl, title }: VideoCardProps) {
  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <ReactPlayer
          width="100%"
          height="100%"
          controls
          url={videoUrl}
          style={{ aspectRatio: "16/9" }}
        />
      </div>
      <h2 className="text-base font-semibold leading-5 text-base-400">
        {title}
      </h2>
    </div>
  );
}
