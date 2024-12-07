"use client";

import { FooterLink } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { FooterMenuItems } from "./FooterMenuItems";
import { Loader } from "./Loader";
import { SectionWrapper } from "./SectionWrapper";

export function BottomFooter() {
  const { data, isLoading, isError } = useSWR("/footer/show");

  if (isLoading) {
    return <Loader className="h-[800px]" />;
  }

  const serializedData = new FooterLink(_.head(data?.data?.results));

  return (
    <SectionWrapper
      isLoading={isLoading}
      isError={isError}
      errorClass="h-[800px]"
      loadingClass="h-[800px]"
      hidden={serializedData.status !== "active"}
    >
      <FooterMenuItems data={serializedData} />

      {/* footer payment method section  */}
      <div className="my-10 flex justify-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${serializedData.footerPaymentImg}`}
          alt="Payment Method"
          height={107}
          width={975}
          className="mx-4 h-[50px] w-full max-w-[975px] sm:h-[65px] xmd:h-[80px] xl:h-[107px]"
        />
      </div>

      <Separator className="container" />

      <div className="container flex flex-col items-center justify-between gap-2 py-4 2xl:flex-row">
        <h4 className="text-center text-base font-medium leading-[30px] md:text-lg lg:text-xl">
          {serializedData.footerCredit}
        </h4>
        <div>
          <ul className="flex flex-col items-center gap-x-4 sm:flex-row xmd:gap-x-8">
            <li>
              <Link
                className="text-base font-semibold leading-[30px] md:text-lg lg:text-xl"
                href="/"
              >
                Privacy & Policy
              </Link>
            </li>
            <li>
              <Link
                className="text-base font-semibold leading-[30px] md:text-lg lg:text-xl"
                href="/"
              >
                Terms & Condition
              </Link>
            </li>
            <li>
              <Link
                className="text-base font-semibold leading-[30px] md:text-lg lg:text-xl"
                href="/"
              >
                Cookies and Data
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}
