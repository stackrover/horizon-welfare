import { config } from "@/utils/config";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Video Gallery - ${config.get("app.name")} | Empowering Underprivileged Communities`,
  description:
    "Watch impactful videos from Horizon Welfare's Video Gallery. Discover our initiatives, success stories, and how we're transforming underprivileged urban communities. Learn more about our mission and how you can get involved.",
};

export default function VideoGalleryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
