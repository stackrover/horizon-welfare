"use client";

import {
  BankDetails,
  BkashMarchantCard,
  ContactDetailsCard,
  Donation,
  ProjectDetailSectionWrapper,
  RecentContributionCard,
} from "@/components";
import Image from "next/image";
import SirenIcon from "../../../../../../public/icons/SirenIcon";

export default function ProjectDetailsPage() {
  return (
    <main>
      {/* image gallery section  */}
      <section className="container mt-[60px]">
        <h1 className="mb-4 text-[40px] font-semibold leading-[48px] text-base-400">
          WASH PROJECT ON CHATTROGRAM
        </h1>
        <div className="flex w-fit items-center gap-4 rounded-full bg-[#FEF3F2] px-10 py-2 font-medium">
          <SirenIcon className="mb-1" />
          <h4 className="text-[#B42318]">Emergency Requirement</h4>
        </div>

        <div className="mt-10 flex items-start gap-2">
          <Image
            src="/images/project-image-1.png"
            alt="project image"
            width={500}
            height={500}
            className="h-[500px] w-fit"
          />
          <div className="grid w-full grid-cols-2 gap-2">
            <Image
              src="/images/project-image-6.png"
              alt="project image"
              width={356}
              height={246}
              className="h-[246px] w-full"
            />
            <Image
              src="/images/project-image-6.png"
              alt="project image"
              width={356}
              height={246}
              className="h-[246px] w-full"
            />
            <Image
              src="/images/project-image-6.png"
              alt="project image"
              width={356}
              height={246}
              className="h-[246px] w-full"
            />
            <Image
              src="/images/project-image-6.png"
              alt="project image"
              width={356}
              height={246}
              className="h-[246px] w-full"
            />
          </div>
        </div>
      </section>
      {/* image gallery section end  */}

      {/* details section  */}
      <section className="container mt-[60px] flex items-start gap-6">
        {/* about section  */}
        <div className="flex flex-1 flex-col gap-y-6">
          <ProjectDetailSectionWrapper title="About">
            <p className="text-base-300">
              Veniam quae. Nostrum facere repellendus minus quod aut aliquam
              neque reiciendis. Qui beatae vel magnam repudiandae ipsum repellat
              repudiandae. Voluptate at dolores ut dolor sint occaecati
              similique. Velit eius ab delectus temporibus. For dynamic content,
              add a rich text field to any collection and then connect a rich
              text element to that field in the settings panel. Headings,
              paragraphs, block-quotes, figures, images, and figure captions can
              all be styled.
            </p>
          </ProjectDetailSectionWrapper>

          <ProjectDetailSectionWrapper title="Documents">
            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-square w-full bg-base-100"></div>
              <div className="aspect-square w-full bg-base-100"></div>
              <div className="aspect-square w-full bg-base-100"></div>
            </div>
          </ProjectDetailSectionWrapper>

          <ProjectDetailSectionWrapper title="Other Donation Methods">
            <BankDetails />
            <BkashMarchantCard />
          </ProjectDetailSectionWrapper>

          <ProjectDetailSectionWrapper title="Contact Details">
            <ContactDetailsCard />
          </ProjectDetailSectionWrapper>
        </div>
        {/* about section end  */}

        {/* aside section  */}
        <aside className="sticky top-[128px] flex w-fit min-w-[420px] flex-col gap-y-6">
          <Donation />
          <RecentContributionCard />
        </aside>
        {/* aside section end  */}
      </section>
      {/* details section end */}
    </main>
  );
}
