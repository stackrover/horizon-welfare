"use client";

import { cn } from "@/lib/utils";
import ReactPlayer from "react-player";

export default function VideoPlayer({
  className,
  videoUrl,
}: {
  className?: string;
  videoUrl: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl overflow-hidden", className)}>
      {/* <div className="mx-auto w-full max-w-7xl translate-y-1/2 overflow-hidden rounded-[20px]"> */}
      <ReactPlayer
        width="100%"
        height="448px"
        controls
        url={videoUrl}
        style={{ borderRadius: "20px" }}
      />
    </div>
  );
}
