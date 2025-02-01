"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { resetPasswordFormSchema } from "@/schemas/resetPasswordFormSchema";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { passwordResetAction } from "../../../actions/authActions";

export default function ResetPassword() {
  const [isShown, setIsShown] = React.useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      token: token || "",
      new_password: "",
      new_password_confirmation: "",
      honey_pot: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordFormSchema>) => {
    if (values.honey_pot) {
      return toast.error("Yey! You are a bot");
    }

    const resp = await passwordResetAction(values);

    if (resp.status === "success") {
      toast.success("Password reset successfully!");
      router.push("/reset-password/success");
    }

    if (resp.status === "error") {
      if (resp.error_type === "general") {
        toast.error(resp.message);
      } else {
        toast.error("Something went wrong! Please try again later.");
      }
    }
  };

  return (
    <main className="px-4">
      <div className="mx-auto my-20 grid max-w-[1200px] gap-4 rounded-[24px] border border-base-100 bg-base-0 p-6 shadow-lg md:grid-cols-2 xmd:p-16">
        {/* form section  */}
        <div>
          <div className="h-12 w-12 rounded-full bg-[#C4C4C4]"></div>
          <h3 className="mt-4 text-2xl font-medium text-base-400 xmd:text-[32px] xmd:leading-[48px]">
            Set Your New Password
          </h3>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
              <div className="flex flex-col gap-4">
                {/* password  */}
                <FormField
                  control={form.control}
                  name="new_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base-300">Password</FormLabel>
                      <FormControl>
                        <Input
                          type={isShown ? "text" : "password"}
                          className="rounded-xl shadow-none"
                          placeholder="******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* confirm password  */}
                <FormField
                  control={form.control}
                  name="new_password_confirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base-300">
                        Confirm your password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type={isShown ? "text" : "password"}
                          className="rounded-xl shadow-none"
                          placeholder="******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* honeypot  */}
                <FormField
                  control={form.control}
                  name="honey_pot"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormLabel className="text-base-300">
                        Email address
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-xl shadow-none"
                          type="email"
                          placeholder="test@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <h4 className="mt-2 text-base-300">
                Use 8 or more characters with a mix of letters, numbers &
                symbols
              </h4>
              <div className="mt-4 flex items-center space-x-2">
                <Checkbox
                  checked={isShown}
                  onCheckedChange={() => setIsShown(!isShown)}
                  id="reset-password"
                />
                <label
                  htmlFor="reset-password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Show Password
                </label>
              </div>

              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                className="mt-8 rounded-full"
              >
                {form.formState.isSubmitting
                  ? "Processing..."
                  : "Reset Password"}
              </Button>
            </form>
          </Form>
        </div>

        {/* logo section  */}
        <div className="hidden flex-col items-start justify-center md:flex mlg:items-center">
          <Image
            src="/images/logo2.png"
            alt="logo"
            height={198}
            width={359}
            className="h-[150px] w-fit mlg:h-[198px] mlg:w-[359px]"
          />
          <h1 className="ml-6 max-w-[359px] text-3xl leading-[46px] text-primary-light mlg:ml-12 mlg:text-[40px]">
            Horizon Welfare Orgainasation
          </h1>
        </div>
      </div>
    </main>
  );
}
