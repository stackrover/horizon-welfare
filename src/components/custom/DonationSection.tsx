"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function DonationSection() {
  return (
    <section className="container flex h-full w-full -translate-y-1/2 flex-col items-start justify-between gap-2 rounded-2xl bg-base-0 px-6 py-6 shadow-xl xmd:px-10 lg:h-[104px] lg:flex-row lg:items-center lg:gap-4 lg:py-0 2xl:px-20">
      <h3 className="whitespace-nowrap text-2xl font-extrabold text-base-400 lg:leading-[48px]">
        Donate <span className="font-normal">Now</span>
      </h3>
      <div className="grid w-full flex-1 grid-cols-2 gap-4 md:grid-cols-3 mlg:grid-cols-5">
        {/* option 1 */}
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* option 2  */}
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* option 3  */}
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* amount */}
        <Input placeholder="Amount" className="w-full" />

        {/* donation button  */}
        <Button className="col-span-2 md:col-span-1">Donate Now</Button>
      </div>
    </section>
  );
}
