"use client";

import { Loader, SectionWrapper } from "@/components";
import FormWrapper from "@/components/forms/FormWrapper";
import { FacebookIcon, LinkedinIcon, TwitterIcon } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { ContactUsContent } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import _ from "lodash";
import Link from "next/link";

export default function ContactUs() {
  const { data, isLoading, isError } = useSWR("/contact/us/page/content/show");

  if (isLoading) {
    return <Loader className="h-[800px]" />;
  }

  const contactInfo = new ContactUsContent(_.head(data?.data?.results));

  return (
    <main className="container max-w-[1080px] p-6">
      <SectionWrapper
        isLoading={isLoading}
        isError={isError}
        errorClass="h-[800px]"
        loadingClass="h-[800px]"
        hidden={
          contactInfo.status !== "active" || data?.data?.results?.length === 0
        }
      >
        <FormWrapper
          defaultValues={{ ...contactInfo.getFormData() }}
          onSubmit={() => {}}
        >
          {/* contact us section  */}
          <section className="container rounded-lg bg-gradient-to-r from-primary-light to-primary p-4 sm:p-10 lg:p-[100px]">
            <div className="mx-auto grid max-w-4xl gap-8 xmd:grid-cols-2">
              <div className="flex flex-col gap-y-6 mlg:gap-y-8">
                <h5 className="text-sm font-bold uppercase leading-[18px] text-base-0 md:text-base">
                  {contactInfo.title}
                </h5>
                <h5 className="text-3xl font-bold text-base-0 md:text-4xl mlg:text-5xl mlg:leading-[68px] xl:text-[56px]">
                  {contactInfo.focusTitle}
                </h5>
                <p className="text-base font-normal leading-8 text-base-100 md:text-xl">
                  {contactInfo.description}
                </p>
              </div>

              <div className="flex flex-col gap-y-8">
                <div>
                  <h3 className="mb-4 text-2xl font-bold leading-[38px] text-base-0">
                    {"Let's talk!"}
                  </h3>
                  <div className="mgl:items-center mb-4 flex flex-col gap-4 mlg:flex-row mlg:justify-between">
                    <h5 className="text-base font-normal leading-7 text-base-0">
                      {contactInfo.mobileNumber}
                    </h5>
                    <h5 className="text-base font-normal leading-7 text-base-0">
                      {contactInfo.email}
                    </h5>
                  </div>
                  <Separator />
                </div>
                <div>
                  <h4 className="mb-4 text-xl font-bold leading-8 text-base-0">
                    Head Office
                  </h4>
                  <h5 className="font-normal leading-[25px] text-base-100">
                    {contactInfo.headOfficeAddress}
                  </h5>
                </div>
                <div>
                  <h4 className="mb-4 text-xl font-bold leading-8 text-base-0">
                    Branch Office
                  </h4>
                  <h5 className="font-normal leading-[25px] text-base-100">
                    {contactInfo.branchOfficeAddress}
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

          {/* map section  */}
          <section className="mt-[100px]">
            <iframe
              src={contactInfo.mapLink}
              width="600"
              height="450"
              style={{ border: 0, width: "100%" }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </section>
          {/* map section end */}
        </FormWrapper>
      </SectionWrapper>
    </main>
  );
}
