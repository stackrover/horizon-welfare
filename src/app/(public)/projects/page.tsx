"use client";

import {
  JoinAsVolunteerCard,
  PackageHeroSection,
  ProjectList,
  ProjectsSection,
  SuccessStoriesSection,
} from "@/components";
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
      <ProjectList />
      {/* project section end */}

      {/* join as volunteer section  */}
      <JoinAsVolunteerCard />
      {/* join as volunteer section end */}
    </main>
  );
}
