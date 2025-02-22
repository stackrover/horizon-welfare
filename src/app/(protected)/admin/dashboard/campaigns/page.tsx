import React from "react";
import { CampaignsDataTable } from "@/components/page-sections/admin";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "@radix-ui/react-icons";

export default function Campaigns() {
  return (
    <section className="grid grid-cols-12 gap-6 p-6">
      <div className="col-span-12 flex items-center justify-between">
        <h1 className="text-[38.4px] font-bold leading-[52.38px] tracking-[-0.14px]">
          Campaigns
        </h1>
        <Button asChild>
          <Link href="/admin/dashboard/campaigns/add">
            <PlusIcon />
            Campaign
          </Link>
        </Button>
      </div>

      <div className="col-span-12 rounded-xl border bg-white p-6">
        <CampaignsDataTable />
      </div>
    </section>
  );
}
