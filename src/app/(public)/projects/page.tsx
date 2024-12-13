"use client";

import {
  DonationCard,
  JoinAsVolunteerCard,
  PackageHeroSection,
  ProjectsSection,
  SuccessStoriesSection,
} from "@/components";
import { cardData } from "@/constants/cardData";
import { usePathname } from "next/navigation";

export default function Projects() {
  const pathname = usePathname();
  return (
    <main>
      <PackageHeroSection />
      {/* project section */}
      <ProjectsSection />
      {/* project section end  */}

      {/* success stories section  */}
      <SuccessStoriesSection />
      {/* success stories section  */}

      {/* project section  */}
      <section className="container mt-[100px]">
        <h1 className="my-8 text-[56px] font-extrabold leading-[67px] text-base-400">
          Your Donation May Change <br /> Someones Life
        </h1>
        <div className="grid gap-x-4 gap-y-4 md:grid-cols-2 lg:grid-cols-3 2xl:gap-x-6 2xl:gap-y-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <DonationCard key={index} cardData={cardData} />
          ))}
        </div>
      </section>
      {/* project section end */}

      {/* join as volunteer section  */}
      <JoinAsVolunteerCard />
      {/* join as volunteer section end */}
    </main>
  );
}
