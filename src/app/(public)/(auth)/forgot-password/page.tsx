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

export default function ForgotPassword() {
  const router = useRouter();

  const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof forgotPasswordFormSchema>) => {
    console.log(values);
    router.push("/forgot-password/email-sent");
  };
  return (
    <main>
      <div className="mx-auto my-20 grid max-w-[1200px] grid-cols-2 gap-4 rounded-[24px] border border-base-100 bg-base-0 p-16 shadow-lg">
        {/* form section  */}
        <div>
          <div className="h-12 w-12 rounded-full bg-[#C4C4C4]"></div>
          <h3 className="mt-4 text-[32px] font-medium leading-[48px] text-base-400">
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

              <div className="mt-8 flex w-full items-center justify-between">
                <Link href="/login" className="underline underline-offset-2">
                  Login instead
                </Link>
                <Button type="submit" className="rounded-full">
                  Send Reset Link
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* logo section  */}
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/images/logo2.png"
            alt="logo"
            height={198}
            width={359}
            className="h-[198px] w-[359px]"
          />
          <h1 className="ml-12 max-w-[359px] text-[40px] leading-[46px] text-primary-light">
            Horizon Welfare Orgainasation
          </h1>
        </div>
      </div>
    </main>
  );
}
