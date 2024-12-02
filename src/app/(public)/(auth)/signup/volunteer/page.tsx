"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { volunteerRegistrationFormSchema } from "@/schemas/volunteerRegistrationFormSchema";
import React from "react";

export default function VolunteerSignup() {
  const [isShown, setIsShown] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof volunteerRegistrationFormSchema>>({
    resolver: zodResolver(volunteerRegistrationFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      division: "",
      district: "",
      email: "",
      address: "",
      password: "",
      confirm_password: "",
      blood_group: "",
      mobile: "",
      profession: "",
      education: "",
    },
  });

  const onSubmit = (
    values: z.infer<typeof volunteerRegistrationFormSchema>,
  ) => {
    console.log(values);
  };
  return (
    <main>
      <div className="mx-4 mt-10 max-w-[1140px] rounded-[24px] border border-base-100 bg-base-0 p-8 shadow-lg xl:mx-auto">
        {/* form section  */}
        <div>
          <div className="h-12 w-12 rounded-full bg-[#C4C4C4]"></div>
          <h3 className="mt-4 text-[32px] font-medium leading-[48px] text-base-400">
            Create an Volunteer account
          </h3>
          <div className="mt-1 flex items-center gap-2">
            <h5>Already have an ccount?</h5>
            <Link href="/login" className="underline underline-offset-2">
              Login
            </Link>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
              <div className="mlg:grid-cols-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
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

                {/* division  */}
                <FormField
                  control={form.control}
                  name="division"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base-300">Division</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="rounded-xl shadow-none">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a division" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="m@example.com">
                            m@example.com
                          </SelectItem>
                          <SelectItem value="m@google.com">
                            m@google.com
                          </SelectItem>
                          <SelectItem value="m@support.com">
                            m@support.com
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* district  */}
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base-300">District</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="rounded-xl shadow-none">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a district" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="m@example.com">
                            m@example.com
                          </SelectItem>
                          <SelectItem value="m@google.com">
                            m@google.com
                          </SelectItem>
                          <SelectItem value="m@support.com">
                            m@support.com
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* email address  */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="col-span-1 sm:col-span-2">
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

                {/* address  */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="col-span-1 sm:col-span-2">
                      <FormLabel className="text-base-300">Address</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-xl shadow-none"
                          type="text"
                          placeholder="Type your detailed address"
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

                {/* Blood group  */}
                <FormField
                  control={form.control}
                  name="blood_group"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base-300">
                        Blood Group
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="rounded-xl shadow-none">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a blood group" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="m@example.com">
                            m@example.com
                          </SelectItem>
                          <SelectItem value="m@google.com">
                            m@google.com
                          </SelectItem>
                          <SelectItem value="m@support.com">
                            m@support.com
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* mobile  */}
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base-300">Mobile No</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-xl shadow-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          type="number"
                          placeholder="01*********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* profession  */}
                <FormField
                  control={form.control}
                  name="profession"
                  render={({ field }) => (
                    <FormItem className="col-span-1 sm:col-span-2">
                      <FormLabel className="text-base-300">
                        Profession
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-xl shadow-none"
                          type="text"
                          placeholder="Type your current profession"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* education  */}
                <FormField
                  control={form.control}
                  name="education"
                  render={({ field }) => (
                    <FormItem className="grid-cols-1 sm:col-span-2">
                      <FormLabel className="text-base-300">Education</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-xl shadow-none"
                          type="text"
                          placeholder="Type your current education status"
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
                symbols as password
              </h4>
              <div className="mt-4 flex items-center space-x-2">
                <Checkbox
                  checked={isShown}
                  onCheckedChange={() => setIsShown(!isShown)}
                  id="show-password-volunteer"
                />
                <label
                  htmlFor="show-password-volunteer"
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
      </div>
    </main>
  );
}
