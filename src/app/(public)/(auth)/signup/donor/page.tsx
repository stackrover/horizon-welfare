"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
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
import { donorRegistrationFormSchema } from "@/schemas/donorRegistrationFormSchema";
import React from "react";

export default function DonorSignup() {
  const [isShown, setIsShown] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof donorRegistrationFormSchema>>({
    resolver: zodResolver(donorRegistrationFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof donorRegistrationFormSchema>) => {
    console.log(values);
  };
  return (
    <main>
      <div className="mx-auto mt-10 grid max-w-[1200px] grid-cols-2 gap-4 rounded-[24px] border border-base-100 bg-base-0 p-8 shadow-lg">
        {/* form section  */}
        <div>
          <div className="h-12 w-12 rounded-full bg-[#C4C4C4]"></div>
          <h3 className="mt-4 text-[32px] font-medium leading-[48px] text-base-400">
            Create an account
          </h3>
          <div className="mt-1 flex items-center gap-2">
            <h5>Already have an ccount?</h5>
            <Link href="/login" className="underline underline-offset-2">
              Login
            </Link>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
              <div className="grid grid-cols-2 gap-4">
                {/* first name  */}
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base-300">
                        First name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-xl shadow-none"
                          type="text"
                          placeholder="Type your first name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* last name  */}
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base-300">Last name</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-xl shadow-none"
                          type="text"
                          placeholder="Type your last name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* email address  */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
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

                {/* password  */}
                <FormField
                  control={form.control}
                  name="password"
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
                  name="confirm_password"
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
              </div>
              <h4 className="mt-2 text-base-300">
                Use 8 or more characters with a mix of letters, numbers &
                symbols
              </h4>
              <div className="mt-4 flex items-center space-x-2">
                <Checkbox
                  checked={isShown}
                  onCheckedChange={() => setIsShown(!isShown)}
                  id="show-password"
                />
                <label
                  htmlFor="show-password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Show Password
                </label>
              </div>
              <div className="mt-8 flex w-full items-center justify-between">
                <Link href="/login" className="underline underline-offset-2">
                  Login instead
                </Link>
                <Button type="submit" className="rounded-full">
                  Create an Account
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
