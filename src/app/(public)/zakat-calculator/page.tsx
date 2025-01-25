"use client";

import { Banner, InputRow } from "@/components";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

export default function ZakatCalculatorPage() {
  return (
    <main>
      <Banner />
      <section className="container mt-20">
        <h5 className="mb-4 text-center text-xl font-medium leading-5">
          Why Give your Zakat with Horizon Welfare?
        </h5>
        <h5 className="mb-4 text-center text-xl font-medium leading-5">
          We have been distributing your Zakat since 1993, giving us vital
          experience of optimising our programs so we can deliver maximium
          impact at a mimium cost.
        </h5>
        <h5 className="mb-4 text-center text-xl font-medium leading-5">
          Our Zakat projects are scholar approved, and delivered in 30 countries
          by local experts, ensuring your zakat reaches the most needy and makes
          the biggest impact around the globe.
        </h5>
        <h5 className="mb-4 text-center text-xl font-medium leading-5">
          Whether you need to pay your Zakat on gold and silver, cash or
          property, our handy tool can be used to easily calculate and pay your
          Zakat.
        </h5>
      </section>

      <section className="container mt-20 grid grid-cols-12 gap-y-8 px-3 sm:px-4 md:gap-16">
        <div className="col-span-12 2xl:col-span-7">
          <div className="flex flex-col gap-y-4 bg-base-0 px-3 py-6 shadow sm:px-8">
            <InputRow
              labelText="Cash at Home/Bank"
              tooltipText="Tooltip"
              value="12302"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                console.log(e.target.value)
              }
            />
            <InputRow
              labelText="Gold & Silver"
              tooltipText="Tooltip"
              value="12302"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                console.log(e.target.value)
              }
            />
            <InputRow
              labelText="Property (Other Than Home)"
              tooltipText="Tooltip"
              value="12302"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                console.log(e.target.value)
              }
            />
            <InputRow
              labelText="Pensions"
              tooltipText="Tooltip"
              value="12302"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                console.log(e.target.value)
              }
            />
            <InputRow
              labelText="Shares"
              tooltipText="Tooltip"
              value="12302"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                console.log(e.target.value)
              }
            />
            <InputRow
              labelText="Other Investments"
              tooltipText="Tooltip"
              value="12302"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                console.log(e.target.value)
              }
            />
            <InputRow
              labelText="Money Owed To You"
              tooltipText="Tooltip"
              value="12302"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                console.log(e.target.value)
              }
            />
            <InputRow
              labelText="Business Value"
              tooltipText="Tooltip"
              value="12302"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                console.log(e.target.value)
              }
            />
          </div>

          <div className="mt-6 flex flex-col gap-y-4 bg-base-0 px-3 py-6 shadow sm:px-8">
            <InputRow
              labelText="Unpaid Debts"
              tooltipText="Tooltip"
              value="12302"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                console.log(e.target.value)
              }
            />
            <InputRow
              labelText="Business Debts"
              tooltipText="Tooltip"
              value="12302"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                console.log(e.target.value)
              }
            />
            <div className="mt-4 flex flex-wrap justify-between rounded-md border-2 border-primary-light px-2.5 sm:items-center md:h-[88px] md:px-10">
              <h2 className="text-xl font-extrabold text-primary-light md:text-[30px]">
                Zakatable amount
              </h2>
              <h2 className="whitespace-nowrap text-xl font-extrabold text-primary-light md:text-[30px]">
                39,000 Tk
              </h2>
            </div>
          </div>
        </div>

        <div className="col-span-12 h-fit rounded-xl border 2xl:col-span-5">
          <Image
            src="/images/donation.png"
            alt="zakat"
            className="h-[175px] w-full rounded-t-xl"
            height={175}
            width={600}
          />
          <div className="p-4">
            <h3 className="whitespace-nowrap text-lg font-semibold text-base-400 lg:text-2xl lg:leading-8">
              Gold Nisab : $ 600,000(87.48g)
            </h3>
            <h3 className="mt-2 whitespace-nowrap text-lg font-semibold text-base-400 lg:text-2xl lg:leading-8">
              Silver Nisab : $ 467 (612.36g)
            </h3>
            <Separator className="my-4 h-1 bg-primary-light" />
            <h3 className="text-center text-xl font-extrabold leading-6 text-base-400">
              Your Zakat Summary
            </h3>
            <div className="my-8 px-6">
              <h3 className="flex items-center justify-between text-lg font-semibold leading-8 text-base-400 lg:text-2xl">
                <span>Total Assets:</span>
                <span>999 Tk</span>
              </h3>
              <h3 className="flex items-center justify-between text-lg font-semibold leading-8 text-base-400 lg:text-2xl">
                <span>Less Total Liabilities:</span>
                <span>0 Tk</span>
              </h3>
              <h3 className="flex items-center justify-between text-lg font-semibold leading-8 text-base-400 lg:text-2xl">
                <span>Equals Total Zakatable:</span>
                <span>999 Tk</span>
              </h3>
            </div>

            <Separator className="h-1 bg-primary-light" />

            <h3 className="mt-2 flex items-center justify-between px-6 text-lg font-semibold leading-8 text-base-400 lg:text-2xl">
              <span>Zakat to Pay:</span>
              <span>999 Tk</span>
            </h3>

            <Button className="mt-6 h-[75px] w-full text-lg font-semibold lg:text-[32px]">
              Pay Your Zakat Now
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
