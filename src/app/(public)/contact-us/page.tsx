"use client";

import {
  ContactUsForm,
  JoinAsVolunteerCard,
  Loader,
  SectionWrapper,
} from "@/components";
import { Separator } from "@/components/ui/separator";
import { ContactUsContent } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import _ from "lodash";
import Link from "next/link";
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from "../../../../public/icons";

export default function ContactUs() {
  const { data, isLoading, isError } = useSWR("/contact/us/page/content/show");

  if (isLoading) {
    return <Loader className="h-[800px]" />;
  }

  const serializedData = new ContactUsContent(_.head(data?.data?.results));

  return (
    <main>
      <SectionWrapper
        isLoading={isLoading}
        isError={isError}
        errorClass="h-[800px]"
        loadingClass="h-[800px]"
        hidden={
          serializedData.status !== "active" ||
          data?.data?.results?.length === 0
        }
      >
        {/* contact us section  */}
        <section className="container mt-10 rounded-lg bg-gradient-to-r from-primary-light to-primary p-4 sm:p-10 lg:mt-[80px] lg:p-[100px]">
          <div className="mx-auto grid max-w-4xl gap-8 xmd:grid-cols-2">
            <div className="flex flex-col gap-y-6 mlg:gap-y-8">
              <h5 className="text-sm font-bold uppercase leading-[18px] text-base-0 md:text-base">
                {serializedData.title}
              </h5>
              <h5 className="text-3xl font-bold text-base-0 md:text-4xl mlg:text-5xl mlg:leading-[68px] xl:text-[56px]">
                {serializedData.focusTitle}
              </h5>
              <p className="text-base font-normal leading-8 text-base-100 md:text-xl">
                {serializedData.description}
              </p>
            </div>

            <div className="flex flex-col gap-y-8">
              <div>
                <h3 className="mb-4 text-2xl font-bold leading-[38px] text-base-0">
                  {"Let's talk!"}
                </h3>
                <div className="mgl:items-center mb-4 flex flex-col gap-4 mlg:flex-row mlg:justify-between">
                  <h5 className="text-base font-normal leading-7 text-base-0">
                    {serializedData.mobileNumber}
                  </h5>
                  <h5 className="text-base font-normal leading-7 text-base-0">
                    {serializedData.email}
                  </h5>
                </div>
                <Separator />
              </div>
              <div>
                <h4 className="mb-4 text-xl font-bold leading-8 text-base-0">
                  Head Office
                </h4>
                <h5 className="font-normal leading-[25px] text-base-100">
                  {serializedData.headOfficeAddress}
                </h5>
              </div>
              <div>
                <h4 className="mb-4 text-xl font-bold leading-8 text-base-0">
                  Branch Office
                </h4>
                <h5 className="font-normal leading-[25px] text-base-100">
                  {serializedData.branchOfficeAddress}
                </h5>
              </div>
              <div className="flex items-center gap-x-5">
                <Link href={"/"}>
                  <FacebookIcon fill="#ffffff" />
                </Link>
                <Link href={"/"}>
                  <TwitterIcon fill="#ffffff" />
                </Link>
                <Link href={"/"}>
                  <LinkedinIcon fill="#ffffff" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* contact us section end   */}

        {/* contact form section  */}
        <section className="mx-auto mt-[100px] max-w-3xl px-4">
          <ContactUsForm />
        </section>
        {/* contact form section end */}

        {/* join as volunteer section  */}
        <JoinAsVolunteerCard />
        {/* join as volunteer section end */}

        {/* map section  */}
        <section className="mt-[100px]">
          <iframe
            src={serializedData.mapLink}
            width="600"
            height="450"
            style={{ border: 1, width: "100%" }}
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </section>
        {/* map section end */}
      </SectionWrapper>
    </main>
  );
}
