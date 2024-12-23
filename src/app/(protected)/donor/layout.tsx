import { DonorProfileNav, Footer, Navbar } from "@/components";
import { TooltipProvider } from "@/components/ui/tooltip";
import React from "react";

export default function DonorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#FCFCFC]">
      <TooltipProvider>
        <Navbar />
        <DonorProfileNav />
        {children}
        <Footer />
      </TooltipProvider>
    </div>
  );
}
