import { config } from "@/utils/config";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Media Center - ${config.get("app.name")} | Empowering Underprivileged Communities`,
  description:
    "Explore the Media Center of Horizon Welfare. Learn about our initiatives, mission, and ways you can get involved to support underprivileged urban communities. Contact us for partnerships, inquiries, and more.",
};
export default function MediaCenterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
