import {
  AboutCards,
  Banner,
  Blogs,
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
      <Blogs url="/blog/list/latest" />
      <WatchOurGallerySection />
    </main>
  );
}
