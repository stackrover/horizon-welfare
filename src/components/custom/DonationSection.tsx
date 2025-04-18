"use client";

import { donateAction } from "@/app/actions/donorActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export function DonationSection() {
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const [amount, setAmount] = React.useState<number>(10);
  const [isLoading, setIsLoading] = React.useState(false);
  const auth = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!auth.data?.user?.id) {
      router.push("/login");
      return;
    }

    if (!amount || amount < 10) {
      toast.error("Please enter a valid donation amount (min 10)");
      return;
    }

    try {
      setIsLoading(true);
      const resp = await donateAction({
        projectId: 1,
        isSubscriptionMoney: "no",
        totalAmount: amount,
        currency: "BDT",
      });

      if (resp.status === "success") {
        formRef.current?.reset();
        window.location.href = resp.checkoutUrl;
      } else if (resp.status === "error" && resp.error_type === "general") {
        toast.error(resp.message);
      } else {
        toast.error("Something went wrong! Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during donation.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container flex h-full w-full -translate-y-1/2 flex-col items-start justify-between gap-2 rounded-2xl bg-base-0 px-6 py-6 shadow-xl xmd:px-10 lg:h-[104px] lg:flex-row lg:items-center lg:gap-4 lg:py-0 2xl:px-20">
      <h3 className="whitespace-nowrap text-2xl font-extrabold text-base-400 lg:leading-[48px]">
        Donate <span className="font-normal">Now</span>
      </h3>

      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="grid w-full flex-1 grid-cols-2 gap-4 md:grid-cols-3 mlg:grid-cols-5"
      >
        {[1, 2, 3].map((item) => (
          <Select key={item}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pick an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <div className="p-4 text-gray-500">No Available option</div>
              </SelectGroup>
            </SelectContent>
          </Select>
        ))}

        {/* Amount input */}
        <Input
          min={10}
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          className="w-full"
          required
        />

        {/* Submit button */}
        <Button
          type="submit"
          className="col-span-2 md:col-span-1"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Donate Now"}
        </Button>
      </form>
    </section>
  );
}
