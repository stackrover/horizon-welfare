"use client";

import { Loader } from "@/components";
import { useSession } from "next-auth/react";
import React from "react";

export default function Children({ children }: { children: React.ReactNode }) {
  const session = useSession();

  if (session.status === "loading") {
    return <Loader className="h-screen" />;
  }

  return children;
}
