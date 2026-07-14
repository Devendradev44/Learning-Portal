"use client";

import ReactPlayer from "react-player";

export default function VideoPlayer() {
  return (
    <ReactPlayer
      src="/videos/sample.mp4"
      controls
      width="100%"
      height="500px"
    />
  );
}