"use client";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import axiosInstance from "@/lib/axios";
import { donorProfileFormSchema } from "@/schemas/donorProfileUpdateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconCloudUpload,
  IconCurrencyDollar,
  IconX,
} from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function DonorProfile() {
  const [file, setFile] = React.useState<File[]>([]);
  const [districts, setDistricts] = React.useState<Record<string, string>[]>(
    [],
  );

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    fileRejections,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
      "image/svg+xml": [],
    },
    maxFiles: 1,
    onDrop(acceptedFiles) {
      setFile(acceptedFiles);
    },
  });

  const form = useForm<z.infer<typeof donorProfileFormSchema>>({
    resolver: zodResolver(donorProfileFormSchema),
    defaultValues: {
      f_name: "",
      l_name: "",
      location: "",
      gender: "",
      age: "",
      email: "",
      person: "",
    },
  });

  // get the districts list initial render
  React.useEffect(() => {
    (async () => {
      const { data } = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_LOCATION_API_URL}/districts`,
      );

      if (data?.status.code === 200) {
        setDistricts(data?.data ?? []);
      }
    })();
  }, []);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof donorProfileFormSchema>) {
    console.log(values);
  }
  return (
    <main>
      {/* personal info  */}
      <section className="container mt-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold leading-9 text-base-400 md:text-[30px]">
                  Personal Info
                </h2>
                <p className="text-sm text-base-300 md:text-base">
                  Update your personal info with your data preferences
                </p>
              </div>
              <Button
                disabled={form.formState.isSubmitting}
                className="hidden w-[132px] md:flex"
                type="submit"
              >
                {form.formState.isSubmitting ? "Loading..." : "Save Settings"}
              </Button>
            </div>

            <Separator className="my-4" />

            <div className="grid grid-cols-12 gap-x-4 gap-y-6">
              {/* left side column  */}
              <div className="order-2 col-span-12 grid grid-cols-12 gap-x-4 gap-y-6 xl:order-1 xl:col-span-8">
                <label className="col-span-12 font-medium sm:col-span-4">
                  Name
                </label>
                {/* first name  */}
                <FormField
                  control={form.control}
                  name="f_name"
                  render={({ field }) => (
                    <FormItem className="col-span-6 sm:col-span-4">
                      <FormControl>
                        <Input type="text" placeholder="shadcn" {...field} />
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
                    <FormItem className="col-span-6 sm:col-span-4">
                      <FormControl>
                        <Input type="text" placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <label className="col-span-12 font-medium sm:col-span-4">
                  Email Address
                </label>
                {/* email  */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="col-span-12 sm:col-span-8">
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="test@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="col-span-4 hidden font-medium xmd:block"></div>
                <div className="col-span-12 flex flex-col gap-4 sm:flex-row xmd:col-span-8">
                  <div className="aspect-square h-[140px] w-[140px] rounded-full bg-base-200"></div>

                  <div className="grid flex-1 grid-cols-12 gap-x-4 gap-y-6">
                    {/* person  */}
                    <label className="col-span-4">Person</label>
                    <FormField
                      control={form.control}
                      name="person"
                      render={({ field }) => (
                        <FormItem className="col-span-8">
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="shadcn"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* age  */}
                    <label className="col-span-4">Age</label>
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem className="col-span-8">
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="shadcn"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* gender  */}
                    <label className="col-span-4">Gender</label>
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem className="col-span-8">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col gap-3 md:flex-row"
                            >
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="male" />
                                </FormControl>
                                <FormLabel className="font-medium hover:cursor-pointer">
                                  Male
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="female" />
                                </FormControl>
                                <FormLabel className="font-medium hover:cursor-pointer">
                                  Female
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="other" />
                                </FormControl>
                                <FormLabel className="font-medium hover:cursor-pointer">
                                  Other
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* last donation  */}
                <div className="col-span-full mt-10">
                  <div className="flex w-full items-center gap-4 rounded-lg bg-[#DEF8FF] px-4">
                    <div className="left-0 top-0 flex h-[46px] w-fit min-w-[46px] items-center justify-center rounded-full outline outline-[6px] outline-[#8EE7FF]">
                      <IconCurrencyDollar size={24} />
                    </div>
                    <h3 className="py-2 text-base font-semibold leading-7 text-base-400 xmd:text-lg">
                      Your Last Donated Amount Was 12,980 BDT at Wednesday 12
                      january
                    </h3>
                  </div>
                </div>

                {/* location and banner image  */}
                <label className="col-span-4">Location</label>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="col-span-8">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select one" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Dhaka">Dhaka</SelectItem>
                          <SelectItem value="Barishal">Barishal</SelectItem>
                          <SelectItem value="Rangpur">Rangpur</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <label className="col-span-12 xmd:col-span-4">
                  Banner Image
                </label>
                <div className="relative col-span-12 md:col-span-5 xmd:col-span-3">
                  {file.length > 0 ? (
                    <>
                      <Image
                        src={URL.createObjectURL(file[0])}
                        alt="banner"
                        height={150}
                        width={200}
                        className="aspect-[4/2] h-fit w-full rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => setFile([])}
                        className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-base-0"
                      >
                        <IconX size={16} />
                      </button>
                    </>
                  ) : null}
                </div>
                <div className="col-span-12 h-[150px] rounded-lg border bg-base-0 p-2 shadow md:col-span-7 xmd:col-span-5">
                  <div
                    {...getRootProps({
                      className: "h-full hover:cursor-pointer",
                    })}
                  >
                    <input {...getInputProps()} />
                    <div className="flex h-full flex-col items-center justify-center gap-4">
                      <div className="rounded-full bg-base-300/20 p-2 outline outline-4 outline-base-300/10">
                        <IconCloudUpload size={28} className="text-base-300" />
                      </div>
                      {isDragAccept && (
                        <p className="text-sm text-base-300">Drop to upload.</p>
                      )}
                      {isDragReject && (
                        <p className="text-sm text-destructive">
                          File not supported!
                        </p>
                      )}
                      {!isDragActive && (
                        <p className="text-center text-sm text-base-300">
                          Click to upload ou drag here your image <br />{" "}
                          Recommended 800x600 resolution (max. 1MB)
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-span-12 md:hidden">
                  <Button
                    disabled={form.formState.isSubmitting}
                    className="w-[132px]"
                    type="submit"
                  >
                    {form.formState.isSubmitting
                      ? "Loading..."
                      : "Save Settings"}
                  </Button>
                </div>
              </div>

              {/* right side column  */}
              <div className="order-1 col-span-12 xl:order-2 xl:col-span-4">
                <div className="ml-0 overflow-hidden rounded-xl border shadow-sm xl:ml-4">
                  <Image
                    src="/images/project-image-6.png"
                    alt="banner"
                    height={200}
                    width={600}
                    className="aspect-[7/3] h-fit w-full"
                  />
                  <div className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-[50px] w-[50px] rounded-full bg-base-200"></div>
                      <div>
                        <h3 className="text-2xl font-semibold leading-8 text-base-400">
                          Marcus Dutra
                        </h3>
                        <p className="leading-7 text-base-300">
                          Designer, Rio de Janeiro, Brasil
                        </p>
                      </div>
                    </div>

                    <Separator className="my-4 h-1 bg-[#BEF1FF]" />

                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-medium text-base-300">
                        Total Donations : 100,000 BDT
                      </h4>
                      <h4 className="font-medium text-base-300">GOLD USER</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </section>
    </main>
  );
}
