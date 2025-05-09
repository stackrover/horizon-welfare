"use client";

import { updateDonorProfileAction } from "@/app/actions/donorActions";
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
import { Separator } from "@/components/ui/separator";
import { DonorData } from "@/data";
import { cn, getImageURL } from "@/lib/utils";
import { donorProfileFormSchema } from "@/schemas/donorProfileUpdateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconCloudUpload,
  IconCurrencyDollar,
  IconEdit,
  IconX,
} from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export function DonorProfile({
  dataPromise,
  userId,
  containerClass,
  formClass,
}: {
  dataPromise: Promise<any>;
  userId: number | string | undefined;
  containerClass?: string;
  formClass?: string;
}) {
  const data = React.use(dataPromise);

  console.log(data, userId);

  const serializedData =
    data.status === "success" ? new DonorData(data?.results) : null;

  const [file, setFile] = React.useState<File[]>([]);
  const [profileImg, setProfileImg] = React.useState<File[]>([]);
  const [profileData, setProfileData] = React.useState<DonorData>();

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
      address: "",
      gender: "",
      age: 0,
      email: "",
      nationality: "",
    },
  });

  React.useEffect(() => {
    if (serializedData) {
      // destructuring the data
      const {
        uid,
        balance,
        bannar_image,
        profile_image,
        mobile_number,
        id,
        ...restData
      } = serializedData;

      form.reset(restData);
      setProfileData(serializedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  //  Form submit handler.
  async function onSubmit(values: z.infer<typeof donorProfileFormSchema>) {
    const formData = new FormData();

    // Loop through the object keys and append them to FormData
    (Object.keys(values) as (keyof typeof values)[]).forEach((key) => {
      formData.append(key, values[key].toString());
    });

    if (file.length > 0) {
      formData.append("bannar_image", file[0]);
    }

    if (profileImg.length > 0) {
      formData.append("profile_image", profileImg[0]);
    }

    // Call the action handler
    const response = await updateDonorProfileAction(formData, userId);

    if (response.status === "success") {
      toast.success(response.message);
    }

    if (response.status === "error") {
      toast.error(response.message);
    }
  }

  return (
    <main>
      {/* personal info  */}
      <section className={cn("container mt-10", containerClass)}>
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
                {form.formState.isSubmitting ? "Saving..." : "Save Settings"}
              </Button>
            </div>

            <Separator className="my-4" />

            <div className={cn("grid grid-cols-12 gap-x-4 gap-y-6", formClass)}>
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
                        <Input
                          type="text"
                          placeholder="Type First Name"
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
                    <FormItem className="col-span-6 sm:col-span-4">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Type Last Name"
                          {...field}
                        />
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
                          placeholder="Type Email Address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="col-span-4 hidden font-medium xmd:block"></div>
                <div className="col-span-12 flex flex-col gap-4 sm:flex-row xmd:col-span-8">
                  <div className="relative aspect-square h-[140px] w-[140px] rounded-full bg-base-200">
                    <Image
                      src={
                        profileImg[0]
                          ? URL.createObjectURL(profileImg[0])
                          : profileData?.profile_image
                            ? getImageURL(profileData?.profile_image)
                            : "/"
                      }
                      alt="profile"
                      height={140}
                      width={140}
                      className="aspect-square h-[140px] w-fit min-w-[140px] rounded-full"
                    />
                    {profileImg[0] ? (
                      <button
                        type="button"
                        onClick={() => setProfileImg([])}
                        className="absolute right-2 top-2 rounded-full bg-destructive p-1 text-base-0"
                      >
                        <IconX size={16} />
                      </button>
                    ) : null}

                    <label
                      htmlFor="donor_profile_image"
                      className="absolute bottom-2.5 right-2.5 cursor-pointer rounded-full bg-secondary p-1.5 text-base-0"
                    >
                      <IconEdit size={16} />
                    </label>

                    <input
                      type="file"
                      onChange={(e) =>
                        setProfileImg(e.target.files ? [e.target.files[0]] : [])
                      }
                      className="hidden"
                      id="donor_profile_image"
                    />
                  </div>

                  <div className="grid flex-1 grid-cols-12 gap-x-4 gap-y-6">
                    {/* person  */}
                    <label className="col-span-4">Nationality</label>
                    <FormField
                      control={form.control}
                      name="nationality"
                      render={({ field }) => (
                        <FormItem className="col-span-8">
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Type Nationality"
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
                              type="number"
                              placeholder="Type Age"
                              {...field}
                              onChange={(e) => field.onChange(+e.target.value)}
                              value={+field.value}
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
                              value={field.value}
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
                {serializedData?.lastDonation ? (
                  <div className="col-span-full mt-10">
                    <div className="flex w-full items-center gap-4 rounded-lg bg-[#DEF8FF] px-4">
                      <div className="left-0 top-0 flex h-[46px] w-fit min-w-[46px] items-center justify-center rounded-full outline outline-[6px] outline-[#8EE7FF]">
                        <IconCurrencyDollar size={24} />
                      </div>
                      <h3 className="py-2 text-base font-semibold leading-7 text-base-400 xmd:text-lg">
                        {`Your Last Donated Amount Was ${serializedData?.lastDonation} ${serializedData?.currency} at ${serializedData.lastDonationDate}`}
                      </h3>
                    </div>
                  </div>
                ) : null}

                {/* location and banner image  */}
                <label className="col-span-4">Address</label>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="col-span-8">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Type Location"
                          {...field}
                        />
                      </FormControl>
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
                      ? "Saving..."
                      : "Save Settings"}
                  </Button>
                </div>
              </div>

              {/* right side column  */}
              <div className="order-1 col-span-12 xl:order-2 xl:col-span-4">
                <div className="ml-0 overflow-hidden rounded-xl border shadow-sm xl:ml-4">
                  <Image
                    src={
                      profileData?.bannar_image
                        ? getImageURL(profileData?.bannar_image)
                        : "/"
                    }
                    alt="banner"
                    height={200}
                    width={600}
                    className="aspect-[7/3] h-fit w-full"
                  />
                  <div className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-[50px] w-[50px] rounded-full bg-base-200">
                        <Image
                          src={
                            profileData?.profile_image
                              ? getImageURL(profileData?.profile_image)
                              : "/"
                          }
                          alt="profile"
                          height={50}
                          width={50}
                          className="aspect-square h-[50px] w-fit min-w-[50px] rounded-full"
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold leading-8 text-base-400">
                          {profileData?.f_name} {profileData?.l_name}
                        </h3>
                        <p className="leading-7 text-base-300">
                          {profileData?.address}
                        </p>
                      </div>
                    </div>

                    <Separator className="my-4 h-1 bg-[#BEF1FF]" />

                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-medium text-base-300">
                        Total Donations : {profileData?.totalDonations} BDT
                      </h4>
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
