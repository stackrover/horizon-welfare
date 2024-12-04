"use client";

import { volunteerRegistrationAction } from "@/app/actions/authActions";
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
import { bloodGroups } from "@/constants/blood-groups";
import { getLocationData } from "@/hooks/get-locations";
import { useToast } from "@/hooks/use-toast";
import { volunteerRegistrationFormSchema } from "@/schemas/volunteerRegistrationFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function VolunteerSignup() {
  const [isShown, setIsShown] = React.useState<boolean>(false);
  const [divisions, setDivisions] = React.useState<Record<string, string>[]>(
    [],
  );
  const [districts, setDistricts] = React.useState<Record<string, string>[]>(
    [],
  );
  const [thanas, setThanas] = React.useState<string[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof volunteerRegistrationFormSchema>>({
    resolver: zodResolver(volunteerRegistrationFormSchema),
    defaultValues: {
      f_name: "",
      l_name: "",
      division: "",
      district: "",
      thana: "",
      email: "",
      address: "",
      password: "",
      confirm_password: "",
      blood_group: "",
      mobile_number: "",
      profession: "",
      education: "",
      honey_pot: "",
    },
  });

  // get the division lis on initial render
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getLocationData("/divisions");
      if (data) {
        setDivisions(data);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (
    values: z.infer<typeof volunteerRegistrationFormSchema>,
  ) => {
    if (values.honey_pot) return;

    const data = await volunteerRegistrationAction(values);

    console.log(data);

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

  // division change handler
  const handleDivisionChange = async (val: string, field: any) => {
    field.onChange(val);
    setDistricts([]);
    setThanas([]);
    const data = await getLocationData(`/division/${val}`);
    if (data) {
      setDistricts(data);
    }
    form.setValue("district", "");
    form.setValue("thana", "");
  };

  // district change handler
  const handleDistrictChange = async (val: string, field: any) => {
    field.onChange(val);
    setThanas([]);
    const data = await getLocationData(`/district/${val}`);
    if (data.length > 0) {
      setThanas(data[0].upazillas);
    }
    form.setValue("thana", "");
  };

  return (
    <main>
      <div className="mx-4 mt-10 max-w-[1140px] rounded-[24px] border border-base-100 bg-base-0 p-6 shadow-lg md:p-8 xl:mx-auto">
        {/* form section  */}
        <div>
          <div className="h-12 w-12 rounded-full bg-[#C4C4C4]"></div>
          <h3 className="mt-4 text-2xl font-medium leading-[48px] text-base-400 sm:text-[28px] md:text-[32px]">
            Create an Volunteer account
          </h3>
          <div className="mt-1 flex items-center gap-2">
            <h5>Already have an account?</h5>
            <Link href="/login" className="underline underline-offset-2">
              Login
            </Link>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
              <div className="grid grid-cols-12 gap-4">
                {/* honey pot  */}
                <FormField
                  control={form.control}
                  name="honey_pot"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormLabel className="text-base-300">Honey pot</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-xl shadow-none"
                          type="text"
                          placeholder="honey pot"
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
                    <FormItem className="col-span-12 sm:col-span-6">
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
                    <FormItem className="col-span-12 sm:col-span-6">
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
                    <FormItem className="col-span-12 md:col-span-4">
                      <FormLabel className="text-base-300">Division</FormLabel>
                      <Select
                        disabled={divisions.length === 0}
                        onValueChange={(val) =>
                          handleDivisionChange(val, field)
                        }
                        value={field.value}
                      >
                        <FormControl className="rounded-xl shadow-none">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a division" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {divisions.length > 0
                            ? divisions.map((division, index) => (
                                <SelectItem
                                  key={index}
                                  value={division.division}
                                >
                                  {division.division}
                                </SelectItem>
                              ))
                            : null}
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
                    <FormItem className="col-span-12 md:col-span-4">
                      <FormLabel className="text-base-300">District</FormLabel>
                      <Select
                        disabled={districts.length === 0}
                        onValueChange={(val) =>
                          handleDistrictChange(val, field)
                        }
                        value={field.value}
                      >
                        <FormControl className="rounded-xl shadow-none">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a district" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {districts.length > 0
                            ? districts.map((district, index) => (
                                <SelectItem
                                  key={index}
                                  value={district.district}
                                >
                                  {district.district}
                                </SelectItem>
                              ))
                            : null}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* thana  */}
                <FormField
                  control={form.control}
                  name="thana"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-4">
                      <FormLabel className="text-base-300">Thana</FormLabel>
                      <Select
                        disabled={thanas.length === 0}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="rounded-xl shadow-none">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a thana" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {thanas.length > 0
                            ? thanas.map((thana, index) => (
                                <SelectItem key={index} value={thana}>
                                  {thana}
                                </SelectItem>
                              ))
                            : null}
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
                    <FormItem className="col-span-12 sm:col-span-6">
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
                    <FormItem className="col-span-12 sm:col-span-6">
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
                    <FormItem className="col-span-12 sm:col-span-6 mlg:col-span-3">
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
                    <FormItem className="col-span-12 sm:col-span-6 mlg:col-span-3">
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
                    <FormItem className="col-span-12 sm:col-span-6 mlg:col-span-3">
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
                          {bloodGroups.map((bloodGroup) => (
                            <SelectItem
                              key={bloodGroup.id}
                              value={bloodGroup.name}
                            >
                              {bloodGroup.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* mobile_number  */}
                <FormField
                  control={form.control}
                  name="mobile_number"
                  render={({ field }) => (
                    <FormItem className="col-span-12 sm:col-span-6 mlg:col-span-3">
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
                    <FormItem className="col-span-12 sm:col-span-6">
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
                    <FormItem className="col-span-12 sm:col-span-6">
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
      </div>
    </main>
  );
}
