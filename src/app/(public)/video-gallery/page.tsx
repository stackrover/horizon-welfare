import { Banner, VideoCard } from "@/components";

export default function VideoGalleryPage() {
  return (
    <main>
      <Banner />
      <section className="container mt-[60px] grid grid-cols-4 gap-x-6 gap-y-8">
        {Array.from({ length: 12 }).map((_, index) => (
          <VideoCard key={index} />
        ))}
      </section>
    </main>
  );
}
