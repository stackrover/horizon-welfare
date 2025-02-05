import { config } from "@/utils/config";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Reset Password - ${config.get("app.name")} | Empowering Underprivileged Communities`,
  description:
    "Reset your Horizon Welfare account password quickly and securely. Regain access to manage donations, track your impact, and support underprivileged communities effectively.",
};

export default function ResetPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
