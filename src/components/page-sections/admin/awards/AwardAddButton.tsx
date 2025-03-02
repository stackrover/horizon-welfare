"use client";

import { addAward } from "@/app/actions/admin/award";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AwardFormSchema } from "@/schemas/awardFormSchema";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { z } from "zod";
import AwardForm from "./AwardForm";
import { UseFormReturn } from "react-hook-form";

type TFormData = z.infer<typeof AwardFormSchema>;

export default function AwardAddButton({ refresh }: { refresh: VoidFunction }) {
  const handleAddAwardData = async (values: TFormData, form: UseFormReturn) => {
    const fd = new FormData();
    Object.keys(values).forEach((key) =>
      fd.append(key, values[key as keyof TFormData] || ""),
    );

    const res = await addAward(fd);
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
          <span> Award </span>
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle> Add New Award </SheetTitle>
          <SheetDescription className="hidden" />
        </SheetHeader>
        <div className="py-6">
          <AwardForm
            formSchema={AwardFormSchema}
            onSubmit={handleAddAwardData as any}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
