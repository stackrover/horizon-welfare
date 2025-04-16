"use client";

import { Loader, SectionWrapper } from "@/components";
import FormWrapper from "@/components/forms/FormWrapper";
import { Separator } from "@/components/ui/separator";
import { FooterLink } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { getImageURL } from "@/lib/utils";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import EditableContent from "../forms/EditableContent";
import { FooterMenuItems } from "./FooterMenuItems";

export function BottomFooter({ editable = false }: { editable?: boolean }) {
  const { data, isLoading, isError, refresh } = useSWR("/footer/show");

  if (isLoading) {
    return <Loader className="h-[800px]" />;
  }

  const serializedData = new FooterLink(_.head(data?.data?.results));

  return (
    <FormWrapper
      defaultValues={{
        ...serializedData.getFormData(),
        footer_payment_img: undefined,
        footer_logo: undefined,
      }}
      onSubmit={async (values) => {
        toast.promise(serializedData.updateData(values), {
          loading: "Loading...",
          success: (res) => {
            console.log(res);
            refresh();
            return res.message;
          },
          error: (res) => res.message,
        });
      }}
    >
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
        <FooterMenuItems data={serializedData} editable={editable} />

        {/* footer payment method section  */}
        <div className="my-10 flex justify-center">
          <EditableContent
            type="file"
            name={serializedData.getInputName("footerPaymentImg")}
            content={getImageURL(serializedData.footerPaymentImg)}
            editable={editable}
            className="h-[50px] w-full max-w-[975px] sm:h-[65px] xmd:h-[80px] xl:h-[107px]"
          >
            <Image
              src={getImageURL(serializedData.footerPaymentImg)}
              alt="Payment Method"
              height={107}
              width={975}
              className="mx-4 h-[50px] w-full max-w-[975px] sm:h-[65px] xmd:h-[80px] xl:h-[107px]"
            />
          </EditableContent>
        </div>

        <Separator className="container" />

        <div className="container flex flex-col items-center justify-between gap-2 py-4 2xl:flex-row">
          <h4 className="text-center text-base font-medium leading-[30px] md:text-lg lg:text-xl">
            <EditableContent
              name={serializedData.getInputName("footerCredit")}
              content={serializedData.footerCredit}
              editable={editable}
            />
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
    </FormWrapper>
  );
}
