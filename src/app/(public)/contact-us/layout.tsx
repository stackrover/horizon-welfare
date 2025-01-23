import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title:
    "Contact Us - Horizon Welfare | Empowering Underprivileged Communities",
  description:
    "Get in touch with Horizon Welfare to learn more about our mission and how you can help. Reach out for inquiries, partnerships, or support in creating a positive impact for underprivileged urban communities.",
};

export default function ContactUsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
