import { Suspense } from "react";
import { HeroSection } from "@/components/page-sections/admin";
import { getData } from "@/hooks/get-data";
import { Loader } from "@/components";

export default async function DashboardHomeHeroSection() {
  const dataPromise = getData("/home/hero", null, {
    next: { tags: ["hello"] },
  });
  return (
    <Suspense fallback={<Loader />}>
      <HeroSection dataPromise={dataPromise} />
    </Suspense>
  );
}
