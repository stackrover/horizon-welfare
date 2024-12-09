"use client";

import { cn } from "@/lib/utils";
import ReactPlayer from "react-player";

export default function VideoPlayer({
  className,
  videoUrl,
  playerHeight,
}: {
  className?: string;
  videoUrl: string;
  playerHeight: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl overflow-hidden", className)}>
      <ReactPlayer
        width="100%"
        height={playerHeight}
        controls
        url={videoUrl}
        style={{ borderRadius: "20px", aspectRatio: "16/9" }}
      />
    </div>
  );
}
