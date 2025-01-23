import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Our Projects - Horizon Welfare | Empowering Urban Communities",
  description:
    "Discover the impactful projects of Horizon Welfare. Learn how we are making a difference in underprivileged urban communities and explore ways you can contribute through partnerships, support, or inquiries.",
};
export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
