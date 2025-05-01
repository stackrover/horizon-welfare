"use client";

import { updateVolunteerProfileAction } from "@/app/actions/volunteerActions";
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
import { bloodGroups } from "@/constants/blood-groups";
import { VolunteerData } from "@/data";
import { getData } from "@/hooks/get-data";
import { useSWR } from "@/hooks/use-swr";
import { cn, getImageURL } from "@/lib/utils";
import { volunteerProfileFormSchema } from "@/schemas/volunteerProfileFormSchema";
import { LocationType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconCloudUpload, IconEdit, IconX } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export function VolunteerProfile({
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
  const serializedData =
    data.status === "success" ? new VolunteerData(data?.results) : null;

  const { data: divisions } = useSWR(`/shared/geo/division`);

  const [file, setFile] = React.useState<File[]>([]);
  const [profileImg, setProfileImg] = React.useState<File[]>([]);
  const [profileData, setProfileData] = React.useState<VolunteerData>();
  const [isShown, setIsShown] = React.useState<boolean>(false);
  const [districts, setDistricts] = React.useState<LocationType[]>([]);
  const [thanas, setThanas] = React.useState<LocationType[]>([]);
  const auth = useSession();

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

  // form instance
  const form = useForm<z.infer<typeof volunteerProfileFormSchema>>({
    resolver: zodResolver(volunteerProfileFormSchema),
    defaultValues: {
      f_name: serializedData?.f_name || "",
      l_name: serializedData?.l_name || "",
      gender: serializedData?.gender || "",
      age: serializedData?.age || 0,
      division: serializedData?.division || "",
      district: serializedData?.district || "",
      thana: serializedData?.thana || "",
      nationality: serializedData?.nationality || "",
      email: serializedData?.email || "",
      address: serializedData?.address || "",
      blood_group: serializedData?.blood_group || "",
      mobile_number: serializedData?.mobile_number || "",
      profession: serializedData?.profession || "",
      education: serializedData?.education || "",
    },
  });

  React.useEffect(() => {
    const fetchData = async () => {
      if (!serializedData || !divisions?.data?.length) return;

      const divisionId = divisions.data.find(
        (d: LocationType) => d.en_name === serializedData.division,
      )?.id;

      if (divisionId) {
        const districtList = await getData(
          `/shared/geo/district?pid=${divisionId}`,
          auth.data?.user.token,
        );
        if (districtList) setDistricts(districtList);
      }
    };

    fetchData();
  }, [data, divisions?.data]);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!serializedData || !districts?.length) return;

      const districtId = districts?.find(
        (d: LocationType) => d.en_name === serializedData.district,
      )?.id;

      if (districtId) {
        const thanaList = await getData(
          `/shared/geo/upazila?pid=${districtId}`,
          auth.data?.user.token,
        );
        if (thanaList) setThanas(thanaList);
      }
    };

    fetchData();
  }, [data, districts]);

  //  Form submit handler.
  async function onSubmit(values: z.infer<typeof volunteerProfileFormSchema>) {
    const formData = new FormData();

    // Loop through the object keys and append them to FormData
    (Object.keys(values) as (keyof typeof values)[]).forEach((key) => {
      if (values[key]) {
        formData.append(key, values[key].toString());
      } else {
        formData.append(key, "");
      }
    });

    if (file.length > 0) {
      formData.append("bannar_image", file[0]);
    }

    if (profileImg.length > 0) {
      formData.append("profile_image", profileImg[0]);
    }

    console.log(formData.get("bannar_image"));
    console.log(formData.get("profile_image"));

    // Call the action handler
    const response = await updateVolunteerProfileAction(formData, userId);

    if (response.status === "success") {
      toast.success(response.message);
      setFile([]);
      setProfileImg([]);
    }

    if (response.status === "error") {
      toast.error(response.message);
    }
  }

  // division change handler
  const handleDivisionChange = async (val: string, field: any) => {
    field.onChange(val);
    setDistricts([]);
    setThanas([]);
    const divisionId = divisions?.data?.find(
      (d: LocationType) => d.en_name === val,
    )?.id;
    const data = await getData(
      `/shared/geo/district?pid=${divisionId}`,
      auth.data?.user.token,
    );

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
    const districtId = districts?.find(
      (d: LocationType) => d.en_name === val,
    )?.id;
    const data = await getData(
      `/shared/geo/upazila?pid=${districtId}`,
      auth.data?.user.token,
    );

    if (data.length > 0) {
      setThanas(data);
    }
    form.setValue("thana", "");
  };

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
                {form.formState.isSubmitting ? "Loading..." : "Save Settings"}
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
                          placeholder="First Name"
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
                        <Input type="text" placeholder="Last Name" {...field} />
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
                  <div className="relative aspect-square h-[140px] w-[140px] rounded-full bg-base-200">
                    <Image
                      src={
                        profileImg[0]
                          ? URL.createObjectURL(profileImg[0])
                          : serializedData?.profile_image
                            ? getImageURL(serializedData?.profile_image)
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
                              placeholder="Nationality"
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
                              min={0}
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

                {/* banner image  */}

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

                {/* division  */}
                <FormField
                  control={form.control}
                  name="division"
                  render={({ field }) => (
                    <FormItem className="col-span-6">
                      <FormLabel>Division</FormLabel>
                      <Select
                        disabled={!divisions?.data?.length}
                        onValueChange={(val) =>
                          handleDivisionChange(val, field)
                        }
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select one" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {divisions?.data?.length
                            ? divisions.data.map((division: LocationType) => (
                                <SelectItem
                                  key={division.id}
                                  value={division.en_name}
                                >
                                  {division.en_name}
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
                    <FormItem className="col-span-6">
                      <FormLabel>District</FormLabel>
                      <Select
                        disabled={!districts?.length}
                        onValueChange={(val) =>
                          handleDistrictChange(val, field)
                        }
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select one" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {districts?.length
                            ? districts.map((district) => (
                                <SelectItem
                                  key={district.id}
                                  value={district.en_name}
                                >
                                  {district.en_name}
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
                    <FormItem className="col-span-6">
                      <FormLabel>Thana</FormLabel>
                      <Select
                        disabled={thanas.length === 0}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select one" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {thanas?.length
                            ? thanas.map((thana) => (
                                <SelectItem
                                  key={thana.id}
                                  value={thana.en_name}
                                >
                                  {thana.en_name}
                                </SelectItem>
                              ))
                            : null}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* address in details  */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="col-span-6">
                      <FormLabel>Address in Details</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* blood group  */}
                <FormField
                  control={form.control}
                  name="blood_group"
                  render={({ field }) => (
                    <FormItem className="col-span-6">
                      <FormLabel>Blood Group</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select one" />
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

                {/* mobile number  */}
                <FormField
                  control={form.control}
                  name="mobile_number"
                  render={({ field }) => (
                    <FormItem className="col-span-6">
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
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
                    <FormItem className="col-span-12">
                      <FormLabel>Profession</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Profession"
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
                    <FormItem className="col-span-12">
                      <FormLabel>Education</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Education" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                <div className="sticky top-[130px] ml-0 overflow-hidden rounded-xl border shadow-sm xl:ml-4">
                  <Image
                    src={
                      serializedData?.bannar_image
                        ? getImageURL(serializedData?.bannar_image)
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
                            serializedData?.profile_image
                              ? getImageURL(serializedData?.profile_image)
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
                          {serializedData?.f_name +
                            " " +
                            serializedData?.l_name}
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
    </main>
  );
}
