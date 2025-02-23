"use client";

import Donation from "@/../../public/images/donate1.png";
import { donateAction } from "@/app/actions/donorActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Project } from "@/data";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

export function ProjectDonation({
  session,
  dataPromise,
  projectId,
}: {
  session: any;
  dataPromise: Promise<any>;
  projectId: string;
}) {
  const data = React.use(dataPromise);
  const [amount, setAmount] = React.useState(10);

  const serializedData = new Project(data?.results);

  const handleDonation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (amount < 10) {
      return toast.error("Minimum donation amount is 10 TK");
    }

    const resp = await donateAction({
      projectId,
      isSubscriptionMoney: "no",
      totalAmount: amount,
      currency: "BDT",
    });

    if (resp.status === "success" && window) {
      window.location.href = resp.checkoutUrl;
    }
  };

  return (
    <main>
      <section className="flex h-[calc(100vh-250px)] flex-col items-center justify-center gap-y-4">
        <Image src={Donation} alt="Donate" className="h-[250px] w-fit" />
        <h4 className="text-xl font-semibold">{serializedData.title}</h4>
        <form onSubmit={handleDonation} className="space-y-4">
          <div>
            <Label>Donation Amount</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(+e.target.value)}
              name="totalAmount"
            />
          </div>
          <Button>Donate with SSLCOMMERZ</Button>
        </form>
      </section>
    </main>
  );
}
