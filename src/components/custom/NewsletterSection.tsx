"use client";

import { subscribe } from "@/app/actions/commonActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { StateType } from "@/types/types";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";

const initialState: StateType = {
  message: null,
  status: null,
  error_type: null,
};

export function NewsletterSection({ className }: { className?: string }) {
  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const [state, formAction] = useFormState(subscribe as any, initialState);

  // show toast message on success or error
  React.useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      if (emailInputRef.current) {
        emailInputRef.current.value = "";
      }
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div
      className={cn(
        "flex h-full w-full flex-1 items-center justify-between gap-x-8 rounded-2xl bg-base-0 p-4 shadow-[7px_20px_50px_rgba(0,0,0,0.09)] xmd:p-8 3xl:pl-16",
        className,
      )}
    >
      <div className="hidden md:block">
        <h2 className="text-2xl font-extrabold leading-8 text-base-400 xl:text-4xl xl:leading-[48px] 2xl:text-[40px]">
          Newsletter
        </h2>
        <h5 className="text-sm font-normal leading-8 text-base-300 2xl:text-base">
          Get Update on out latest project
        </h5>
      </div>
      <form
        action={formAction}
        className="flex w-full max-w-[500px] flex-1 items-center rounded-lg bg-[rgba(239,241,249,0.6)] p-1"
      >
        <Input
          ref={emailInputRef}
          className="w-full border-none bg-transparent shadow-none focus:shadow-none focus-visible:ring-0"
          placeholder="Email Address"
          type="text"
          name="email"
          id="email-subscribe"
          required
        />
        <SubscribeButton />
      </form>
    </div>
  );
}

// subscribe button component
const SubscribeButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      {pending ? "Subscribing..." : "Subscribe"}
    </Button>
  );
};
