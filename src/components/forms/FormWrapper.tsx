import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { Form } from "../ui/form";

type CtxType = {
  onSubmit: () => void;
  form: UseFormReturn<any, any, undefined>;
};

const FormWrapperCtx = React.createContext<CtxType | null>(null);

export const useFormWrapper = () => {
  const ctx = React.useContext(FormWrapperCtx);
  if (!ctx)
    throw new Error(
      "useFormWrapper should be used within FormWrapperCtx.Provider",
    );
  return ctx;
};

export default function FormWrapper({
  defaultValues,
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  defaultValues?: any;
  onSubmit: (values: any) => void;
}) {
  const form = useForm({
    defaultValues,
  });

  return (
    <FormWrapperCtx.Provider
      value={{ onSubmit: form.handleSubmit(onSubmit), form }}
    >
      <Form {...form}>{children}</Form>
    </FormWrapperCtx.Provider>
  );
}
