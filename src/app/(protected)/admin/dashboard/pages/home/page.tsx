import { Suspense } from "react";
import {
  HeroSection,
  ServiceSection,
  GallerySection,
} from "@/components/page-sections/admin";
import { getData } from "@/hooks/get-data";
import { Loader } from "@/components";
import { Accordion } from "@/components/ui/accordion";

export default function DashboardHomeHeroSection() {
  // hero section data
  const heroSectionData = getData("/home/hero", null, {
    next: { tags: ["hello"] },
  });

  // service section data
  const serviceSectionData = getData("/home/service", null, {
    next: { tags: ["homeSerivce"] },
  });

  // gallery section data
  const galleriesSectionData = getData("/home/gallery", null, {
    next: { tags: ["homeSerivce"] },
  });

  return (
    <section className="space-y-6 p-6">
      <h1 className="text-2xl font-bold"> Home page </h1>

      <Accordion type="multiple" className="flex flex-col space-y-6">
        <Suspense fallback={<Loader />}>
          <HeroSection dataPromise={heroSectionData} />
        </Suspense>

        {/* Service section */}
        <Suspense fallback={<Loader />}>
          <ServiceSection dataPromise={serviceSectionData} />
        </Suspense>

        {/* Gallery section */}
        <Suspense fallback={<Loader />}>
          <GallerySection dataPromise={galleriesSectionData} />
        </Suspense>
      </Accordion>
    </section>
  );
}
