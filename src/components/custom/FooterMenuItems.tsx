"use client";

import { FooterContactSection, FooterMenuLink, Logo } from "@/components";

export function FooterMenuItems({ data }: { data: any }) {
  return (
    <footer className="container grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {/* logo section  */}
      <div className="flex flex-col gap-y-5">
        <Logo logo={data?.footerLogo} />
        <h3 className="text-2xl font-medium leading-6 text-base-300">
          {data?.footerDescription}
        </h3>
      </div>

      {/* link section 1  */}

      <div className="flex justify-start lg:justify-center">
        <nav>
          <h2 className="mb-6 text-[22px] font-semibold leading-8 text-base-400 lg:text-[26px]">
            Useful Links
          </h2>
          <ul className="flex flex-col gap-y-4">
            <FooterMenuLink
              href={data?.usefulLink1}
              text={data?.usefulLinkTitle1}
            />
            <FooterMenuLink
              href={data?.usefulLink2}
              text={data?.usefulLinkTitle2}
            />
            <FooterMenuLink
              href={data?.usefulLink3}
              text={data?.usefulLinkTitle3}
            />
            <FooterMenuLink
              href={data?.usefulLink4}
              text={data?.usefulLinkTitle4}
            />
          </ul>
        </nav>
      </div>

      {/* link section 1  */}
      <div className="flex justify-start lg:justify-center">
        <nav>
          <h2 className="mb-6 text-[22px] font-semibold leading-8 text-base-400 lg:text-[26px]">
            Main Menu
          </h2>
          <ul className="flex flex-col gap-y-4">
            <FooterMenuLink
              href={data?.mainMenuLink1}
              text={data?.mainMenuTitle1}
            />
            <FooterMenuLink
              href={data?.mainMenuLink2}
              text={data?.mainMenuTitle2}
            />
            <FooterMenuLink
              href={data?.mainMenuLink3}
              text={data?.mainMenuTitle3}
            />
            <FooterMenuLink
              href={data?.mainMenuLink4}
              text={data?.mainMenuTitle4}
            />
          </ul>
        </nav>
      </div>

      {/* contact us section  */}
      <FooterContactSection />
    </footer>
  );
}
