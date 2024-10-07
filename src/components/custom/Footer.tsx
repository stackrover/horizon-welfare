"use client";

import {
  FooterMenuItems,
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
import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";

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
        <FooterMenuItems />

        {/* footer payment method section  */}
        <div className="my-10 flex justify-center">
          <Image
            src="/images/payment-method.png"
            alt="Payment Method"
            height={107}
            width={975}
          />
        </div>

        <Separator className="container" />

        <div className="container flex items-center justify-between pt-4">
          <h4 className="text-xl font-medium leading-[30px]">
            ©2022 Horizon Welfare Organization. All rights reserved
          </h4>
          <div>
            <ul className="flex items-center gap-x-8">
              <li>
                <Link className="text-xl font-semibold leading-[30px]" href="/">
                  Privacy & Policy
                </Link>
              </li>
              <li>
                <Link className="text-xl font-semibold leading-[30px]" href="/">
                  Terms & Condition
                </Link>
              </li>
              <li>
                <Link className="text-xl font-semibold leading-[30px]" href="/">
                  Cookies and Data
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
