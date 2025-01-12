"use client";

import { HeroSection } from "@/components/page-sections/admin";

export default function HomePage() {
  return (
    <div className="w-full p-8">
      <h1 className="mb-6 text-2xl font-bold"> Home page</h1>

      <HeroSection />
    </div>
  );
}
