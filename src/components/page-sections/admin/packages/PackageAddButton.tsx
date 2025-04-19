"use client";

import { addPackage } from "@/app/actions/admin/pages/package";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { packageAddFormSchema } from "@/schemas/packageFormSchema";
import { Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import PackageForm from "./PackageForm";

type TFormData = z.infer<typeof packageAddFormSchema>;

export default function PackageAddButton({
  refresh,
}: {
  refresh: VoidFunction;
}) {
  const handleAddPackageData = async (
    values: TFormData,
    form: UseFormReturn,
  ) => {
    const fd = new FormData();

    Object.keys(values).forEach((key) => {
      const typedKey = key as keyof TFormData;
      const value = values[typedKey];

      // Check if the value is a File (Blob) or a number, and convert accordingly
      if (typeof value === "number") {
        fd.append(typedKey, value.toString()); // Convert number to string
      } else {
        fd.append(typedKey, (value as string) || "");
      }
    });

    const res = await addPackage(fd);
    if (res.status === "success") {
      toast.success(res.message);
      form.reset();
      refresh();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Plus />
          <span> Package </span>
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle> Add New Package </SheetTitle>
          <SheetDescription className="hidden" />
        </SheetHeader>
        <div className="py-6">
          <PackageForm
            formSchema={packageAddFormSchema}
            onSubmit={handleAddPackageData as any}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
