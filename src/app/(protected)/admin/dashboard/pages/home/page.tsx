import { Suspense } from "react";
import {
  HeroSection,
  ServiceSection,
  GallerySection,
} from "@/components/page-sections/admin";
import { getData } from "@/hooks/get-data";
import { Loader } from "@/components";
import { Accordion } from "@/components/ui/accordion";

export default async function DashboardHomeHeroSection() {
  const [heroData, serviceData, galleryData] = await Promise.all([
    getData("/home/hero", null, { next: { tags: ["homeHero"] } }),
    getData("/home/service", null, { next: { tags: ["homeService"] } }),
    getData("/home/gallery", null, { next: { tags: ["homeGallery"] } }),
  ]);

  return (
    <section className="space-y-6 p-6">
      <h1 className="text-2xl font-bold"> Home page </h1>

      <Accordion type="multiple" className="flex flex-col space-y-6">
        <HeroSection data={heroData} />
        <ServiceSection data={serviceData} />
        <GallerySection data={galleryData} />
      </Accordion>
    </section>
  );
}
