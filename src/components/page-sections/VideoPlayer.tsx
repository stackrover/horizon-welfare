"use client";

import ReactPlayer from "react-player";

export default function VideoPlayer() {
  return (
    <div className="mx-auto w-full max-w-7xl translate-y-1/2 overflow-hidden rounded-[20px]">
      <ReactPlayer
        width="100%"
        height="448px"
        controls
        url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
      />
    </div>
  );
}
