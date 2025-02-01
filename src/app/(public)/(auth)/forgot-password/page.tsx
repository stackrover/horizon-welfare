"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgotPasswordFormSchema } from "@/schemas/forgotPasswordFormSchema";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { sendPasswordResetEmailAction } from "../../../actions/authActions";

export default function ForgotPassword() {
  const router = useRouter();

  const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
      honey_pot: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordFormSchema>) => {
    if (values.honey_pot) {
      return toast.error("Yey! You are a bot");
    }

    const resp = await sendPasswordResetEmailAction(values);

    if (resp.status === "success") {
      toast.success("Password reset link sent successfully");
      router.push("/forgot-password/email-sent");
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
            Forgot Password
          </h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
              {/* email address  */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
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

              <div className="mt-8 flex w-full items-center justify-between">
                <Link href="/login" className="underline underline-offset-2">
                  Login instead
                </Link>
                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  className="rounded-full"
                >
                  {form.formState.isSubmitting
                    ? "Processing..."
                    : "Send Reset Link"}
                </Button>
              </div>
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
