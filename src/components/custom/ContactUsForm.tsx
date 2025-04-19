"use client";

import { contactUs } from "@/app/actions/commonActions";
import { Button } from "@/components/ui/button";
import { InputProps } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

export function ContactUsForm({ className }: { className?: string }) {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState<typeof initialState, FormData>(
    contactUs,
    initialState,
  );

  // show toast message on success or error
  React.useEffect(() => {
    if (state.status) {
      if (state.status === "success") {
        toast.success(state.message);
        if (formRef.current) {
          formRef.current.reset();
        }
      } else if (state.status === "error" && state.error_type === "general") {
        toast.error(state.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className={cn("grid grid-cols-1 gap-8 sm:grid-cols-2", className)}
    >
      <div>
        <label
          htmlFor="contact-us-first-name"
          className="font-semibold text-gray-400"
        >
          First Name
        </label>
        <FormInput
          type="text"
          placeholder="Type your first name"
          name="contact-us-first-name"
          id="contact-us-first-name"
          required
        />
      </div>
      <div>
        <label
          htmlFor="contact-us-last-name"
          className="font-semibold text-gray-400"
        >
          Last Name
        </label>
        <FormInput
          type="text"
          placeholder="Type your last name"
          name="contact-us-last-name"
          id="contact-us-last-name"
          required
        />
      </div>
      <div>
        <label
          htmlFor="contact-us-email"
          className="font-semibold text-gray-400"
        >
          Email
        </label>
        <FormInput
          type="email"
          placeholder="Type your email address"
          name="contact-us-email"
          id="contact-us-email"
          required
        />
      </div>
      <div>
        <label
          htmlFor="contact-us-subject"
          className="font-semibold text-gray-400"
        >
          Subject
        </label>
        <FormInput
          type="text"
          id="contact-us-subject"
          placeholder="Type your subject"
          name="contact-us-subject"
          required
        />
      </div>

      <div className="col-span-full">
        <label
          htmlFor="contact-us-message"
          className="font-semibold text-gray-400"
        >
          Message
        </label>
        <Textarea
          id="contact-us-message"
          name="contact-us-message"
          rows={4}
          className="text-base shadow-none focus-visible:ring-primary"
          required
        />
      </div>
      <div className="col-span-full flex justify-center">
        <SubmitButton />
      </div>
    </form>
  );
}

const FormInput = ({ type, ...props }: InputProps) => {
  return (
    <input
      type={type}
      {...props}
      className="h-10 w-full border-b bg-transparent outline-none transition-all focus:border-b focus:border-primary focus:outline-none active:outline-none"
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
