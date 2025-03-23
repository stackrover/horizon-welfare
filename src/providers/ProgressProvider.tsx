"use client";

import { AppProgressProvider } from "@bprogress/next";
import { ReactNode } from "react";

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AppProgressProvider
      height="4px"
      color="#31B0E5"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </AppProgressProvider>
  );
};
