"use client";

import { ProfileNav, VolunteerProjectCard } from "@/components";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { IconCloudUpload, IconX } from "@tabler/icons-react";
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <main>
      <ProfileNav />

      {/* personal info  */}
      <section className="container mt-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-[30px] font-semibold leading-9 text-base-400">
                  Personal Info
                </h2>
                <p className="text-base-300">
                  Update your personal info with your data preferences
                </p>
              </div>
              <Button type="submit">Save Settings</Button>
            </div>

            <Separator className="my-4" />

            <div className="grid grid-cols-12 gap-x-4 gap-y-6">
              {/* left side column  */}
              <div className="col-span-8 grid grid-cols-12 gap-x-4 gap-y-6">
                <label className="col-span-4 font-medium">Name</label>
                {/* first name  */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="col-span-4">
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
                  name="username"
                  render={({ field }) => (
                    <FormItem className="col-span-4">
                      <FormControl>
                        <Input type="text" placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <label className="col-span-4 font-medium">Email Address</label>
                {/* email  */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="col-span-8">
                      <FormControl>
                        <Input type="email" placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="col-span-4 font-medium"></div>
                <div className="col-span-8 flex gap-x-4">
                  <div className="aspect-square h-[140px] w-[140px] rounded-full bg-base-200"></div>

                  <div className="grid flex-1 grid-cols-12 gap-x-4 gap-y-6">
                    {/* person  */}
                    <label className="col-span-4">Person</label>
                    <FormField
                      control={form.control}
                      name="username"
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
                      name="username"
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
                      name="username"
                      render={({ field }) => (
                        <FormItem className="col-span-8">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex gap-3"
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

                {/* location and banner image  */}
                <label className="col-span-4">Location</label>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="col-span-8">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a location" />
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

                <label className="col-span-4">Banner Image</label>
                <div className="relative col-span-3">
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
                <div className="col-span-5 h-[150px] rounded-lg border shadow">
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

                {/* location  */}

                {/* division  */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="col-span-6">
                      <FormLabel>Division</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a location" />
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

                {/* district  */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="col-span-6">
                      <FormLabel>District</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a location" />
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

                {/* address in details  */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Address in Details</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* blood group  */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="col-span-6">
                      <FormLabel>Blood Group</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* mobile number  */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="col-span-6">
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* profession  */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Profession</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* education  */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Education</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* right side column  */}
              <div className="col-span-4">
                <div className="sticky top-[130px] ml-4 overflow-hidden rounded-xl border shadow-sm">
                  <Image
                    src="/images/project-image-6.png"
                    alt="banner"
                    height={200}
                    width={600}
                    className="h-[200px] w-full"
                  />
                  <div className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-[50px] w-[50px] rounded-full bg-base-200"></div>
                      <div>
                        <h3 className="text-2xl font-semibold leading-8 text-base-400">
                          Marcus Dutra
                        </h3>
                        <p className="leading-7 text-base-300">Volunteer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </section>

      {/* available volunteer projects  */}
      <VolunteerProjectCard />
    </main>
  );
}
