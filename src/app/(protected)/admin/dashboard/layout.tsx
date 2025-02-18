import * as React from "react";
import { DashboardNavbar, DashboardSiebar } from "@/components";
import { Metadata } from "next";
import { config } from "@/utils/config";

export const metadata: Metadata = {
  title: `Admin Dashboard | ${config.get("app.name")}`,
  description:
    "Manage your company/project effectively with this powerful admin control panel.",
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-row">
      <DashboardSiebar />
      <div className="flex-1">
        <DashboardNavbar />
        {children}
      </div>
    </div>
  );
}
