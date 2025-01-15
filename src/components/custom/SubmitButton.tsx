"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export default function SubmitButton({
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" {...props}>
      {pending ? "Processing..." : children}
    </Button>
  );
}
