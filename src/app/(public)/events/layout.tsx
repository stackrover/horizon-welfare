import { config } from "@/utils/config";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Events - ${config.get("app.name")} | Empowering Underprivileged Communities`,
  description:
    "Discover upcoming events organized by Horizon Welfare. Join us in making a difference through community programs, fundraising initiatives, and volunteer opportunities aimed at supporting underprivileged urban communities.",
};

export default function EventsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
