import { Footer, Navbar, VolunteerProfileNav } from "@/components";
import { TooltipProvider } from "@/components/ui/tooltip";
import { config } from "@/utils/config";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Volunteer - ${config.get("app.name")} | Empowering Underprivileged Communities`,
  description:
    "Reset your Horizon Welfare account password quickly and securely. Regain access to manage donations, track your impact, and support underprivileged communities effectively.",
};

export default function VolunteerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#FCFCFC]">
      <TooltipProvider>
        <Navbar />
        <VolunteerProfileNav />
        {children}
        <Footer />
      </TooltipProvider>
    </div>
  );
}
