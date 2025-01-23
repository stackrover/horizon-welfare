import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title:
    "Volunteer Signup - Horizon Welfare | Empowering Underprivileged Communities",
  description:
    "Join Horizon Welfare as a volunteer and make a meaningful impact in the lives of underprivileged urban communities. Sign up today to contribute your time and skills to our mission of creating a better future.",
};

export default function VolunteerSignupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
