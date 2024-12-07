"use client";

import {
  ContactDetailsCard,
  ProjectDetailSectionWrapper,
  SubscriptionCard,
} from "@/components";
import Image from "next/image";

export default function MonthlyAvailableProjectDetailsPage() {
  return (
    <main>
      {/* image gallery section  */}
      <section className="container mt-[60px]">
        <h1 className="mb-2 text-2xl font-semibold text-base-400 md:text-3xl lg:text-[40px] xl:leading-[48px]">
          General Donation For Ngo
        </h1>
        <h5 className="text-base leading-7 text-base-300 md:text-lg xl:text-2xl">
          Details goes here
        </h5>

        <div className="mt-10 flex flex-col items-start gap-2 xl:flex-row">
          <Image
            src="/images/project-image-1.png"
            alt="project image"
            width={500}
            height={500}
            className="h-fit w-full xl:h-[500px] xl:w-fit"
          />
          <div className="grid w-full grid-cols-2 gap-2">
            <Image
              src="/images/project-image-6.png"
              alt="project image"
              width={356}
              height={246}
              className="h-[180px] w-full xmd:h-[246px]"
            />
            <Image
              src="/images/project-image-6.png"
              alt="project image"
              width={356}
              height={246}
              className="h-[180px] w-full xmd:h-[246px]"
            />
            <Image
              src="/images/project-image-6.png"
              alt="project image"
              width={356}
              height={246}
              className="h-[180px] w-full xmd:h-[246px]"
            />
            <Image
              src="/images/project-image-6.png"
              alt="project image"
              width={356}
              height={246}
              className="h-[120px] w-full md:h-[180px] xmd:h-[246px]"
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

          <ProjectDetailSectionWrapper title="Contact Details">
            <ContactDetailsCard />
          </ProjectDetailSectionWrapper>
        </div>
        {/* about section end  */}

        {/* aside section  */}
        <aside className="sticky top-[128px] flex w-fit min-w-[420px] flex-col gap-y-6">
          <SubscriptionCard subscribed={false} />
        </aside>
        {/* aside section end  */}
      </section>
      {/* details section end */}
    </main>
  );
}
