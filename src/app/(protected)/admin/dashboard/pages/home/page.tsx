import { Suspense } from "react";
import {
  HeroSection,
  ServiceSection,
  GallerySection,
} from "@/components/page-sections/admin";
import { getData } from "@/hooks/get-data";
import { Loader } from "@/components";
import { Accordion } from "@/components/ui/accordion";

async function fetchSectionsData() {
  const [heroSectionData, serviceSectionData, galleriesSectionData] =
    await Promise.all([
      getData("/home/hero", null, { next: { tags: ["hello"] } }),
      getData("/home/service", null, { next: { tags: ["homeSerivce"] } }),
      getData("/home/gallery", null, { next: { tags: ["galleriesSection"] } }),
    ]);

  return { heroSectionData, serviceSectionData, galleriesSectionData };
}

export default async function DashboardHomeHeroSection() {
  const { heroSectionData, serviceSectionData, galleriesSectionData } =
    await fetchSectionsData();

  return (
    <section className="space-y-6 p-6">
      <h1 className="text-2xl font-bold"> Home page </h1>

      <Suspense fallback={<Loader />}>
        <Accordion type="multiple" className="flex flex-col space-y-6">
          <HeroSection data={heroSectionData} />
          <ServiceSection data={serviceSectionData} />
          <GallerySection data={galleriesSectionData} />
        </Accordion>
      </Suspense>
    </section>
  );
}
