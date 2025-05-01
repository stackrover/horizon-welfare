import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useController, UseControllerProps } from "react-hook-form";
import { match } from "ts-pattern";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { BlogSelection } from "./BlogSelection";
import DatePicker from "./DatePicker";
import { SelectProject } from "./SelectProject";
import UploadImage from "./UploadImage";
const TextEditor = dynamic(() => import("./TextEditor"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

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

export default function InputField({
  required = true,
  labelClass,
  className,
  ...props
}: FormFieldProps) {
  const { field, fieldState } = useController(props);
  return (
    <div className="flex flex-col gap-2">
      {props.label && (
        <Label
          htmlFor={field.name}
          className={cn("text-sm font-medium text-gray-500", labelClass)}
        >
          {props.label} {!required && "(Optional)"}
        </Label>
      )}
      {match(props.type)
        .with("textarea", () => (
          <Textarea
            {...field}
            placeholder={props?.placeholder}
            className={className}
          />
        ))

        .with("textEditor", () => (
          <TextEditor
            value={field.value}
            onValueChange={field.onChange}
            placeholder={props.placeholder}
            className={className}
          />
        ))

        // file
        .with("file", () => (
          <UploadImage className={className} {...props} {...field} />
        ))
        // radio type
        .with("radio", () => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className={cn("flex items-center gap-2", className)}
          >
            {props.options?.map((option) => (
              <Label key={option.value} className="cursor-pointer">
                <RadioGroupItem value={option.value} />
                <span> {option.label} </span>
              </Label>
            ))}
          </RadioGroup>
        ))

        .with("blogSelection", () => (
          <BlogSelection value={field.value} onSelect={field.onChange} />
        ))
        .with("selectProject", () => (
          <SelectProject value={field.value} onSelectChange={field.onChange} />
        ))

        .with("number", () => (
          <Input
            type="number"
            {...field}
            onChange={(e) => field.onChange(+e.target.value)}
            className={cn(
              "w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary focus:ring-primary",
              className,
            )}
            onFocus={(e) => e.target.select()}
          />
        ))

        .with("select", () => (
          <Select
            value={field.value?.toString()}
            onValueChange={field.onChange}
          >
            <SelectTrigger>
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {props?.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))

        .with("date", () => (
          <DatePicker
            value={field.value}
            onChange={field.onChange}
            format="yyyy-MM-dd"
          />
        ))

        // native type
        .with(
          "text",
          "email",
          "password",
          "tel",
          "url",
          "search",
          "color",
          "time",
          () => (
            <Input
              id={field.name}
              type={props.type}
              placeholder={props.placeholder}
              {...(props.type === "time" ? { format: "HH:mm" } : {})}
              {...field}
              className={cn(
                fieldState.error ? "border-red-500 focus:ring-red-500" : "",
                "rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary",
                className,
              )}
            />
          ),
        )
        .otherwise(() => null)}

      {fieldState.error && (
        <p className="text-sm text-red-500">{fieldState.error.message}</p>
      )}
    </div>
  );
}
