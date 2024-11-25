import { Error, Loader } from "@/components";
import { AxiosError } from "axios";
import React from "react";

type SectionWrapperProps = {
  children: React.ReactNode;
  isError: AxiosError | undefined;
  isLoading: boolean;
  errorClass?: string;
  loadingClass?: string;
  hidden?: boolean;
  className?: string;
};

export function SectionWrapper({
  children,
  isError,
  isLoading,
  errorClass,
  loadingClass,
  hidden = false,
  className,
}: SectionWrapperProps) {
  if (isLoading) {
    return <Loader className={loadingClass} />;
  }

  if (hidden) {
    return null;
  }

  if (isError) {
    return <Error className={errorClass} />;
  }

  return <section className={className}>{children}</section>;
}
