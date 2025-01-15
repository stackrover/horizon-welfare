import * as React from "react";
import { DashboardNavbar, DashboardSiebar } from "@/components";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-row bg-[#F5F6FA]">
      <DashboardSiebar />
      <div className="h-screen flex-1">
        <DashboardNavbar />
        {children}
      </div>
    </div>
  );
}
