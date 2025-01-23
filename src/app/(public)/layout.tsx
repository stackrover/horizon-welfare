import { Footer, Navbar } from "@/components";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Home - Horizon Welfare | Empowering Underprivileged Communities",
  description:
    "Support Horizon Welfare in transforming urban lives. Join our mission to provide essential resources and opportunities to underprivileged communities. Your contributions can make a lasting impact. Donate today and help create a brighter future for all.",
};

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
