import { cn } from "@/lib/utils";
import { useController, UseControllerProps } from "react-hook-form";
import { match } from "ts-pattern";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface FormFieldProps extends UseControllerProps {
  label?: string;
  placeholder?: string;
  type: string;
  required?: boolean;
  options?: { label: string; value: string }[];
}

export default function InputField({
  required = true,
  ...props
}: FormFieldProps) {
  const { field, fieldState } = useController(props);
  return (
    <div className="flex flex-col gap-2">
      {props.label && (
        <Label
          htmlFor={field.name}
          className="text-sm font-medium text-gray-500"
        >
          {props.label} {!required && "(Optional)"}
        </Label>
      )}
      {match(props.type)
        // radio type
        .with("radio", () => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="flex items-center gap-2"
          >
            {props.options?.map((option) => (
              <Label key={option.value} className="cursor-pointer">
                <RadioGroupItem value={option.value} />
                <span> {option.label} </span>
              </Label>
            ))}
          </RadioGroup>
        ))

        .with("number", () => (
          <Input
            type="number"
            {...field}
            onChange={(e) => field.onChange(+e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary focus:ring-primary"
            onFocus={(e) => e.target.select()}
          />
        ))

        // native type
        .with(
          "text",
          "email",
          "password",
          "date",
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
              className={cn(
                fieldState.error ? "border-red-500 focus:ring-red-500" : "",
                "rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary",
                className,
              )}
              {...field}
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
