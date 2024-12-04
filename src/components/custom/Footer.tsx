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

      <footer className="bg-[#F6FCFF] pt-[170px] xl:pt-0">
        {/* top footer start  */}
        <div className="container flex h-[132px] -translate-y-60 flex-col items-center gap-6 xl:-translate-y-1/2 xl:flex-row">
          {/* newsletter section  */}
          <NewsletterSection />

          {/* social media section  */}
          <div className="flex h-full items-center justify-between gap-x-4 rounded-2xl bg-base-0 p-4 shadow-[7px_20px_50px_rgba(0,0,0,0.09)] xmd:gap-x-5 xmd:p-8">
            <SocialIcon icon={<IconBrandFacebook size={30} />} />
            <SocialIcon icon={<IconBrandInstagram size={30} />} />
            <SocialIcon icon={<IconBrandTwitter size={30} />} />
            <SocialIcon icon={<IconBrandYoutube size={30} />} />
          </div>
          {/* top footer end  */}
        </div>

        <BottomFooter />
      </footer>
    </div>
  );
}
