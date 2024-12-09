"use client";

import {
  CancelSubscriptionCard,
  ContactDetailsCard,
  ProjectDetailSectionWrapper,
  SubscriptionCard,
} from "@/components";
import Image from "next/image";

export default function MonthlySubscribedProjectDetailsPage() {
  return (
    <main>
      {/* image gallery section  */}
      <section className="container mt-[60px]">
        <h1 className="mb-2 text-[40px] font-semibold leading-[48px] text-base-400">
          General Donation For Ngo
        </h1>
        <h5 className="text-2xl leading-7 text-base-300">Details goes here</h5>

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

          <ProjectDetailSectionWrapper title="Contact Details">
            <ContactDetailsCard />
          </ProjectDetailSectionWrapper>
        </div>
        {/* about section end  */}

        {/* aside section  */}
        <aside className="sticky top-[128px] flex w-fit min-w-[420px] flex-col gap-y-6">
          <SubscriptionCard subscribed={true} />
          <CancelSubscriptionCard />
        </aside>
        {/* aside section end  */}
      </section>
      {/* details section end */}
    </main>
  );
}
