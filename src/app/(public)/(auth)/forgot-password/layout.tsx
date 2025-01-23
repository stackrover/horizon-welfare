import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title:
    "Forgot Password - Horizon Welfare | Empowering Underprivileged Communities",
  description:
    "Reset your Horizon Welfare account password quickly and securely. Regain access to manage donations, track your impact, and support underprivileged communities effectively.",
};

export default function ForgotPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
