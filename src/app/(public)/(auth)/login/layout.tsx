import { config } from "@/utils/config";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Login - ${config.get("app.name")} | Empowering Underprivileged Communities`,
  description:
    "Log in to your Horizon Welfare account to manage donations, track your impact, and stay updated with our initiatives. Join our mission to empower urban communities today.",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
