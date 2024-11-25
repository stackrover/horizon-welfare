"use client";

import {
  BottomFooter,
  NewsletterSection,
  SocialIcon,
  TopPartnersSection,
} from "@/components";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";
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

      <footer className="h-[800px] bg-[#F6FCFF]">
        {/* top footer start  */}
        <div className="container flex h-[132px] -translate-y-1/2 items-center gap-x-6">
          {/* newsletter section  */}
          <NewsletterSection />

          {/* social media section  */}
          <div className="flex h-full items-center justify-between gap-x-5 rounded-2xl bg-base-0 px-8 shadow-[7px_20px_50px_rgba(0,0,0,0.09)]">
            <SocialIcon icon={<IconBrandFacebook size={34} />} />
            <SocialIcon icon={<IconBrandInstagram size={34} />} />
            <SocialIcon icon={<IconBrandTwitter size={34} />} />
            <SocialIcon icon={<IconBrandYoutube size={34} />} />
          </div>
          {/* top footer end  */}
        </div>

        <BottomFooter />
      </footer>
    </div>
  );
}
