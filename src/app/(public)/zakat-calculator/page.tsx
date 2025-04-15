"use client";

import { donateAction } from "@/app/actions/donorActions";
import { Banner, InputRow } from "@/components";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const FORM_FIELDS = [
  {
    name: "cash",
    label: "Cash at Home/Bank",
    type: "number",
    placeholder: "Enter amount",
  },
  {
    name: "goldAndSilver",
    label: "Gold & Silver",
    type: "number",
    placeholder: "Enter amount",
  },
  {
    name: "property",
    label: "Property (Other Than Home)",
    type: "number",
    placeholder: "Enter amount",
  },
  {
    name: "pension",
    label: "Pensions",
    type: "number",
    placeholder: "Enter amount",
  },
  {
    name: "shares",
    label: "Shares",
    type: "number",
    placeholder: "Enter amount",
  },
  {
    name: "investments",
    label: "Other Investments",
    type: "number",
    placeholder: "Enter amount",
  },
  {
    name: "owedMoney",
    label: "Money Owed To You",
    type: "number",
    placeholder: "Enter amount",
  },
  {
    name: "businessValue",
    label: "Business Value",
    type: "number",
    placeholder: "Enter amount",
  },
];

export const zakatDonationSchema = z.object({
  cash: z.coerce.number().min(1, "Amount must be greater than 0"),
  goldAndSilver: z.coerce.number().min(1, "Amount must be greater than 0"),
  property: z.coerce.number().min(1, "Amount must be greater than 0"),
  pension: z.coerce.number().min(1, "Amount must be greater than 0"),
  shares: z.coerce.number().min(1, "Amount must be greater than 0"),
  investments: z.coerce.number().min(1, "Amount must be greater than 0"),
  owedMoney: z.coerce.number().min(1, "Amount must be greater than 0"),
  businessValue: z.coerce.number().min(1, "Amount must be greater than 0"),
  unpaidDebts: z.coerce.number().min(1, "Amount must be greater than 0"),
  businessDebt: z.coerce.number().min(1, "Amount must be greater than 0"),
});

const formDefaultValues = {
  cash: 0,
  goldAndSilver: 0,
  property: 0,
  pension: 0,
  shares: 0,
  investments: 0,
  owedMoney: 0,
  businessValue: 0,
  unpaidDebts: 0,
  businessDebt: 0,
};

type FormData = z.infer<typeof zakatDonationSchema>;

export default function ZakatCalculatorPage() {
  const [goldNisab, setGoldNisab] = React.useState(1101408);
  const [silverNisab, setSilverNisab] = React.useState(77498);
  const [zakatableAmount, setZakatableAmount] = React.useState(0);
  const [zakatToPay, setZakatToPay] = React.useState(0);
  const [totalAssets, setTotalAssets] = React.useState(0);
  const [totalLiabilities, setTotalLiabilities] = React.useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(zakatDonationSchema),
    defaultValues: formDefaultValues,
  });

  console.log({ zakatToPay, zakatableAmount });

  React.useEffect(() => {
    const subscription = form.watch((values) => {
      const assets =
        (values.cash ?? 0) +
        (values.goldAndSilver ?? 0) +
        (values.property ?? 0) +
        (values.pension ?? 0) +
        (values.shares ?? 0) +
        (values.investments ?? 0) +
        (values.owedMoney ?? 0) +
        (values.businessValue ?? 0);

      const liabilities =
        (values.unpaidDebts ?? 0) + (values.businessDebt ?? 0);
      const netAmount = assets - liabilities;

      setZakatableAmount(netAmount);
      setZakatToPay(netAmount >= silverNisab ? netAmount * 0.025 : 0);
      setTotalAssets(assets);
      setTotalLiabilities(liabilities);
    });

    return () => subscription.unsubscribe();
  }, [form, silverNisab]);

  const handleSubmit = async (formData: FormData) => {
    const resp = await donateAction({
      projectId: 100000,
      isSubscriptionMoney: "no",
      totalAmount: zakatToPay,
      currency: "BDT",
    });

    if (resp.status === "success" && window) {
      form.reset();
      window.location.href = resp.checkoutUrl;
    } else if (resp.status === "error" && resp.error_type === "general") {
      toast.error(resp.message);
    } else {
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <main>
      <Banner />
      <section className="container mt-20">
        <h5 className="mb-4 text-center text-base font-medium leading-8 sm:text-lg xmd:text-xl">
          Why Give your Zakat with Horizon Welfare?
        </h5>
        <h5 className="mb-4 text-center text-base font-medium leading-8 sm:text-lg xmd:text-xl">
          We have been distributing your Zakat since 1993, giving us vital
          experience of optimising our programs so we can deliver maximium
          impact at a mimium cost.
        </h5>
        <h5 className="mb-4 text-center text-base font-medium leading-8 sm:text-lg xmd:text-xl">
          Our Zakat projects are scholar approved, and delivered in 30 countries
          by local experts, ensuring your zakat reaches the most needy and makes
          the biggest impact around the globe.
        </h5>
        <h5 className="mb-4 text-center text-base font-medium leading-8 sm:text-lg xmd:text-xl">
          Whether you need to pay your Zakat on gold and silver, cash or
          property, our handy tool can be used to easily calculate and pay your
          Zakat.~
        </h5>
      </section>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <section className="container mt-20 grid grid-cols-12 gap-y-8 px-3 sm:px-4 md:gap-16">
            <div className="col-span-12 2xl:col-span-7">
              <div className="flex flex-col gap-y-4 bg-base-0 px-3 py-6 shadow sm:px-8">
                {FORM_FIELDS.map((field) => (
                  <InputRow key={field.name} {...field} />
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-y-4 bg-base-0 px-3 py-6 shadow sm:px-8">
                <InputRow
                  name="unpaidDebts"
                  type="number"
                  label="Unpaid Debts"
                  placeholder="Enter amount"
                />
                <InputRow
                  name="businessDebt"
                  type="number"
                  label="Business Debt"
                  placeholder="Enter amount"
                />

                <div className="mt-4 flex flex-wrap justify-between rounded-md border-2 border-primary-light px-2.5 sm:items-center md:h-[88px] md:px-10">
                  <h2 className="text-xl font-extrabold text-primary-light md:text-[30px]">
                    Zakatable amount
                  </h2>
                  <h2 className="whitespace-nowrap text-xl font-extrabold text-primary-light md:text-[30px]">
                    {zakatableAmount.toLocaleString()} Tk
                  </h2>
                </div>
              </div>
            </div>

            <div className="col-span-12 h-fit rounded-xl border 2xl:col-span-5">
              <Image
                src="/images/donation.png"
                alt="zakat"
                className="h-auto w-full rounded-t-xl"
                height={175}
                width={600}
              />
              <div className="p-4">
                <h3 className="whitespace-nowrap text-lg font-semibold text-base-400 lg:text-2xl lg:leading-8">
                  Gold Nisab : ৳ {goldNisab.toLocaleString()} (87.48g)
                </h3>
                <h3 className="mt-2 whitespace-nowrap text-lg font-semibold text-base-400 lg:text-2xl lg:leading-8">
                  Silver Nisab : ৳ {silverNisab.toLocaleString()} (612.36g)
                </h3>
                <Separator className="my-4 h-1 bg-primary-light" />
                <h3 className="text-center text-xl font-extrabold leading-6 text-base-400">
                  Your Zakat Summary
                </h3>
                <div className="my-8 px-6">
                  <h3 className="flex items-center justify-between text-lg font-semibold leading-8 text-base-400 lg:text-2xl">
                    <span>Total Assets:</span>
                    <span>{totalAssets.toLocaleString()} Tk</span>
                  </h3>
                  <h3 className="flex items-center justify-between text-lg font-semibold leading-8 text-base-400 lg:text-2xl">
                    <span>Less Total Liabilities:</span>
                    <span>{totalLiabilities.toLocaleString()} Tk</span>
                  </h3>
                  <h3 className="flex items-center justify-between text-lg font-semibold leading-8 text-base-400 lg:text-2xl">
                    <span>Equals Total Zakatable:</span>
                    <span className="text-end">
                      {zakatableAmount.toLocaleString()} Tk
                    </span>
                  </h3>
                </div>

                <Separator className="h-1 bg-primary-light" />

                <h3 className="mt-2 flex items-center justify-between px-6 text-lg font-semibold leading-8 text-base-400 lg:text-2xl">
                  <span>Zakat to Pay:</span>
                  <span>{zakatToPay.toLocaleString()} Tk</span>
                </h3>

                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  className="mt-6 h-[75px] w-full text-lg font-semibold lg:text-[32px]"
                >
                  {form.formState.isSubmitting
                    ? "Processing..."
                    : "Pay Your Zakat Now"}
                </Button>
              </div>
            </div>
          </section>
        </form>
      </Form>
    </main>
  );
}
