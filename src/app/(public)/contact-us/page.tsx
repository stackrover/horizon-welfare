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
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from "../../../../public/icons";

export default function ContactUs() {
  const { data, isLoading, isError } = useSWR("/contact/us/page/content/show");
  const session = useSession();

  console.log({ session });

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
        hidden={serializedData.status !== "active"}
      >
        {/* contact us section  */}
        <section className="container mt-[80px] rounded-lg bg-gradient-to-r from-primary-light to-primary p-[100px]">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8">
            <div className="flex flex-col gap-y-8">
              <h5 className="text-base font-bold uppercase leading-[18px] text-base-0">
                {serializedData.title}
              </h5>
              <h5 className="text-[56px] font-bold leading-[68px] text-base-0">
                {serializedData.focusTitle}
              </h5>
              <p className="text-xl font-normal leading-8 text-base-100">
                {serializedData.description}
              </p>
            </div>

            <div className="flex flex-col gap-y-8">
              <div>
                <h3 className="mb-4 text-2xl font-bold leading-[38px] text-base-0">
                  {"Let's talk!"}
                </h3>
                <div className="mb-4 flex items-center justify-between">
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
        <section className="mx-auto mt-[100px] max-w-3xl">
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
            style={{ border: 0, width: "100%" }}
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </section>
        {/* map section end */}
      </SectionWrapper>
    </main>
  );
}
