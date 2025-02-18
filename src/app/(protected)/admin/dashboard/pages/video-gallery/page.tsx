"use client";

import {
  VideoGalleryCardsSection,
  VideoGalleryHeroSection,
} from "@/components";

export default function VideoGalleryPage() {
  return (
    <main className="p-4">
      <VideoGalleryHeroSection editable />
      <VideoGalleryCardsSection editable />
    </main>
  );
}
