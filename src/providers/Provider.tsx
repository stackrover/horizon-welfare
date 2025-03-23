import React from "react";
import { ProgressProvider } from "./ProgressProvider";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProgressProvider>{children}</ProgressProvider>;
}
