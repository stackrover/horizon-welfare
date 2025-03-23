"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AwardSection } from "@/data";
import { EditAwardFormSchema } from "@/schemas/awardFormSchema";
import { IconEdit } from "@tabler/icons-react";
import AwardForm from "./AwardForm";
import { getImageURL } from "@/lib/utils";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import { updateAwardData } from "@/app/actions/admin/award";

type TFormData = z.infer<typeof EditAwardFormSchema>;

export default function AwardEditButton({
  editData,
  refresh,
}: {
  refresh: VoidFunction;
  editData: AwardSection;
}) {
  const handleUpdateAwardData = async (
    values: TFormData,
    form: UseFormReturn,
  ) => {
    const fd = new FormData();
    Object.keys(values).forEach((key) =>
      fd.append(key, values[key as keyof TFormData] || ""),
    );

    const res = await updateAwardData(fd, editData.id);
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
          <SheetTitle> Edit Award </SheetTitle>
          <SheetDescription className="hidden" />
        </SheetHeader>
        <div className="py-6">
          <AwardForm
            formSchema={EditAwardFormSchema}
            defaultValues={{ ...editData.getOriginal() }}
            onSubmit={handleUpdateAwardData as any}
            preview={getImageURL(editData.logo)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
