import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export type AwardFormProps<T extends z.ZodType<any, any>> = {
  formSchema: T;
  onSubmit: (values: z.infer<T>, form: UseFormReturn<T>) => void;
  defaultValues?: any;
  preview?: string;
};
