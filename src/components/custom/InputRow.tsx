"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconInfoCircleFilled } from "@tabler/icons-react";
import React from "react";

export function InputRow({
  labelText,
  tooltipText,
  ...props
}: {
  labelText: string;
  tooltipText: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="" className="flex-1 text-xl font-bold text-base-400">
        {labelText}
      </Label>
      <div className="flex w-fit min-w-[350px] items-center bg-[#F3F3F3]">
        <h3 className="flex h-10 w-[72px] items-center justify-center bg-gradient-to-r from-primary-light to-primary font-bold text-base-0">
          TK
        </h3>
        <Input
          type="number"
          className="border-none bg-transparent text-base font-medium [appearance:textfield] focus-visible:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          {...props}
        />
      </div>
      <Tooltip>
        <TooltipTrigger>
          <IconInfoCircleFilled className="fill-primary" size={36} />
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
