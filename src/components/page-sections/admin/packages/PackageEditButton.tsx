"use client";

import { updatePackage } from "@/app/actions/admin/pages/package";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Package } from "@/data/package/package-data";
import { packageUpdateFormSchema } from "@/schemas/packageFormSchema";
import { IconEdit } from "@tabler/icons-react";
import { UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import PackageForm from "./PackageForm";

type TFormData = z.infer<typeof packageUpdateFormSchema>;

export default function PackageEditButton({
  editData,
  refresh,
}: {
  refresh: VoidFunction;
  editData: Package;
}) {
  const handleUpdateAwardData = async (
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
        fd.append(typedKey, value as string || "");
      }
    });

    const res = await updatePackage(fd, editData.id);
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
        <Button size="icon" variant="ghost">
          <IconEdit size={20} />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle> Edit Package </SheetTitle>
          <SheetDescription className="hidden" />
        </SheetHeader>
        <div className="py-6">
          <PackageForm
            formSchema={packageUpdateFormSchema}
            defaultValues={{ ...editData.getOriginal() }}
            onSubmit={handleUpdateAwardData as any}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
