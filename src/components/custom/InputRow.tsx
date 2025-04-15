"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconInfoCircleFilled } from "@tabler/icons-react";
import { useController, UseControllerProps } from "react-hook-form";

interface FormFieldProps extends UseControllerProps {
  label?: string;
  placeholder?: string;
  type: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  defaultPreview?: string;
  className?: string;
  labelClass?: string;
}

export function InputRow({
  required = true,
  labelClass,
  className,
  ...props
}: FormFieldProps) {
  const { field, fieldState } = useController(props);
  return (
    <div>
      <div className="grid grid-cols-[1fr_36px] gap-2 lg:grid-cols-[minmax(200px,300px)_1fr_36px]">
        <Label
          htmlFor={field.name}
          className="col-span-full flex-1 text-xl font-bold text-base-400 lg:col-span-1"
        >
          {props.label}
        </Label>
        <div>
          <div className="flex items-center bg-[#F3F3F3]">
            <h3 className="flex h-10 w-[72px] items-center justify-center bg-gradient-to-r from-primary-light to-primary font-bold text-base-0">
              TK
            </h3>
            <Input
              type="number"
              {...field}
              onChange={(e) => field.onChange(+e.target.value)}
              className="border-none bg-transparent text-base font-medium [appearance:textfield] focus-visible:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              onFocus={(e) => e.target.select()}
            />
          </div>
          {fieldState.error && (
            <p className="mt-1 text-sm text-red-500">
              {fieldState.error.message}
            </p>
          )}
        </div>
        <Tooltip>
          <TooltipTrigger>
            <IconInfoCircleFilled className="fill-primary" size={36} />
          </TooltipTrigger>
          <TooltipContent>
            <p>{props.label}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
