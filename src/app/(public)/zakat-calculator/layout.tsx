import { Metadata } from "next";
import React from "react";
import { config } from "../../../utils/config";

export const metadata: Metadata = {
  title: `Zakat Calculator - ${config.get("app.name")} | Empowering Underprivileged Communities`,
  description:
    "Use the Horizon Welfare Zakat Calculator to determine your Zakat contribution. Support underprivileged urban communities and empower those in need through your charitable donations. Learn more about how your Zakat can make a difference.",
};

export default function ZakatCalculatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
