import {
  AboutCards,
  Banner,
  BlogSection,
  DonationSection,
  NgoProjectSection,
  WatchOurGallerySection,
} from "@/components";

export default function Home() {
  return (
    <main>
      <Banner />
      <DonationSection />
      <NgoProjectSection />
      <AboutCards />
      <BlogSection />
      <WatchOurGallerySection />
    </main>
  );
}
