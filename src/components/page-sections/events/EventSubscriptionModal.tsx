"use client";

import { subscribeEvent } from "@/app/actions/eventActions";
import { Button } from "@/components/ui/button";
import { InputProps } from "@/components/ui/input";
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

export function EventSubscriptionModal({ eventId }: { eventId: number }) {
  const formRef = React.useRef<HTMLFormElement>(null);
  const updatedSubscribeEvent = subscribeEvent.bind(null, eventId);
  const [state, formAction] = useFormState(updatedSubscribeEvent, initialState);

  // show toast message on success or error
  React.useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      if (formRef.current) {
        // formRef.current.reset();
      }
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <form
      ref={formRef}
      action={formAction}
      className="grid grid-cols-1 gap-8 sm:grid-cols-2"
    >
      <div>
        <label
          htmlFor="event-subscription-first-name"
          className="font-semibold text-gray-400"
        >
          First Name
        </label>
        <FormInput
          type="text"
          placeholder="Type your first name"
          name="fname"
          id="event-subscription-first-name"
          required
        />
      </div>
      <div>
        <label
          htmlFor="event-subscription-last-name"
          className="font-semibold text-gray-400"
        >
          Last Name
        </label>
        <FormInput
          type="text"
          placeholder="Type your last name"
          name="lname"
          id="event-subscription-last-name"
          required
        />
      </div>
      <div>
        <label
          htmlFor="event-subscription-email"
          className="font-semibold text-gray-400"
        >
          Email
        </label>
        <FormInput
          type="email"
          placeholder="Type your email address"
          name="email"
          id="event-subscription-email"
          required
        />
      </div>
      <div>
        <label
          htmlFor="event-subscription-mobile"
          className="font-semibold text-gray-400"
        >
          Mobile
        </label>
        <FormInput
          type="number"
          minLength={11}
          maxLength={11}
          id="event-subscription-mobile"
          placeholder="Type your mobile number"
          name="mobile"
          required
          className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      </div>

      <div className="col-span-full flex justify-center">
        <SubmitButton />
      </div>
    </form>
  );
}

const FormInput = ({ type, className, ...props }: InputProps) => {
  return (
    <input
      type={type}
      {...props}
      className={cn(
        "h-10 w-full border-b bg-transparent outline-none transition-all focus:border-b focus:border-primary focus:outline-none active:outline-none",
        className,
      )}
    />
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" className="w-fit">
      {pending ? "Sending..." : "Send Message"}
    </Button>
  );
};
