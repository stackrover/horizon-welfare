import Children from "@/components/custom/Children";
import { Toaster as ShadCnToaster } from "@/components/ui/toaster";
import { config } from "@/utils/config";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${config.get("app.name")} | Empowering Underprivileged Communities`,
  description: "Horizon Welfare Organization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`!${plusJakartaSans.className} antialiased`}
        style={plusJakartaSans.style}
      >
        <Toaster />
        <SessionProvider>
          <Children>{children}</Children>
        </SessionProvider>
        <Toaster />
        <ShadCnToaster />
      </body>
    </html>
  );
}
