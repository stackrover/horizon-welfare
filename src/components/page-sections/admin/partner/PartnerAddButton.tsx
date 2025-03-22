import React from "react";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import PartnerForm from "./PartnerForm";
import { PartnerAddFormSchema } from "@/schemas/partnerFormSchema";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import { addPartner } from "@/app/actions/admin/partner";
import toast from "react-hot-toast";

type TFormData = z.infer<typeof PartnerAddFormSchema>;

export function PartnerAddButton({ refresh }: { refresh: VoidFunction }) {
  const handleAddPartnerData = async (
    values: TFormData,
    form: UseFormReturn,
  ) => {
    const fd = new FormData();
    Object.keys(values).forEach((key) =>
      fd.append(key, values[key as keyof TFormData] || ""),
    );

    const res = await addPartner(fd);
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
          <IconPlus size={20} />
          <span> Partner </span>
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader className="border-b pb-4">
          <SheetTitle> Add Partner </SheetTitle>
          <SheetDescription className="hidden" />
        </SheetHeader>

        <div className="py-5">
          <PartnerForm
            formSchema={PartnerAddFormSchema}
            onSubmit={handleAddPartnerData as any}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
