import { Footer, Navbar } from "@/components";
import { TooltipProvider } from "@/components/ui/tooltip";
import React from "react";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TooltipProvider>
      <div className="bg-[#FCFCFC]">
        <Navbar />
        {children}
        <Footer />
      </div>
    </TooltipProvider>
  );
}
