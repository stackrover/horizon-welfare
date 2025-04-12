"use client";

import {
  BottomFooter,
  NewsletterSection,
  SocialIconSection,
  TopPartnersSection
} from "@/components";
import dynamic from "next/dynamic";

const SummaryCards = dynamic(() => import("@/components/custom/SummaryCards"), {
  ssr: false,
});

export function Footer() {
  return (
    <div>
      {/* summary card section  */}
      <SummaryCards />

      {/* top partner section  */}
      <TopPartnersSection />

      <footer className="bg-[#F6FCFF] pt-[170px] xl:pt-0">
        {/* top footer start  */}
        <div className="container flex h-[132px] -translate-y-60 flex-col items-center gap-6 xl:-translate-y-1/2 xl:flex-row">
          {/* newsletter section  */}
          <NewsletterSection />

          {/* social media section  */}
          <SocialIconSection />
          {/* top footer end  */}
        </div>

        <BottomFooter />
      </footer>
    </div>
  );
}
