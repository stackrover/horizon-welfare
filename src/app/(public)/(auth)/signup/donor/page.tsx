"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { donorRegistrationAction } from "@/app/actions/authActions";
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
import { useToast } from "@/hooks/use-toast";
import { donorRegistrationFormSchema } from "@/schemas/donorRegistrationFormSchema";
import { useRouter } from "next/navigation";
import React from "react";

export default function DonorSignup() {
  const [isShown, setIsShown] = React.useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof donorRegistrationFormSchema>>({
    resolver: zodResolver(donorRegistrationFormSchema),
    defaultValues: {
      f_name: "",
      l_name: "",
      email: "",
      password: "",
      confirm_password: "",
      honey_pot: "",
      mobile_number: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof donorRegistrationFormSchema>,
  ) => {
    if (values.honey_pot) return;

    const data = await donorRegistrationAction(values);

    if (data.status === "success") {
      form.reset();
      toast({
        variant: "success",
        description: "Registration Successful",
      });
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }

    if (data.status === "error") {
      toast({
        variant: "destructive",
        description: data.message,
      });
    }
  };

  return (
    <main>
      <div className="mx-4 mt-10 grid max-w-[1140px] grid-cols-1 gap-4 rounded-[24px] border border-base-100 bg-base-0 p-6 shadow-lg md:p-8 xmd:grid-cols-2 2xl:mx-auto">
        {/* form section  */}
        <div>
          <div className="h-12 w-12 rounded-full bg-[#C4C4C4]"></div>
          <h3 className="mt-4 text-2xl font-medium leading-[48px] text-base-400 sm:text-[28px] md:text-[32px]">
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* honey pot  */}
                <FormField
                  control={form.control}
                  name="honey_pot"
                  render={({ field }) => (
                    <FormItem className="hidden">
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

                {/* first name  */}
                <FormField
                  control={form.control}
                  name="f_name"
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
                  name="l_name"
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
                    <FormItem className="">
                      <FormLabel className="text-base-300">
                        Email address
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-xl shadow-none"
                          type="Email address"
                          placeholder="test@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* mobile_number  */}
                <FormField
                  control={form.control}
                  name="mobile_number"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-base-300">
                        Mobile Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-xl shadow-none"
                          type="Mobile number"
                          placeholder="01*********"
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
              <div className="mt-8 flex w-full flex-col items-start gap-y-4 sm:flex-row sm:items-center sm:justify-between sm:gap-y-0">
                <Link
                  href="/login"
                  className="order-2 underline underline-offset-2 sm:order-1"
                >
                  Login instead
                </Link>
                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  className="order-1 w-full rounded-full sm:order-2 sm:w-[164px]"
                >
                  {form.formState.isSubmitting
                    ? "Loading..."
                    : "Create an Account"}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* logo section  */}
        <div className="hidden flex-col items-center justify-center xmd:flex">
          <Image
            src="/images/logo2.png"
            alt="logo"
            height={198}
            width={359}
            className="h-[150px] w-fit mlg:h-[198px] mlg:w-[359px]"
          />
          <h1 className="max-w-[359px] text-center text-3xl leading-[46px] text-primary-light mlg:text-[40px]">
            Horizon Welfare Organization
          </h1>
        </div>
      </div>
    </main>
  );
}
