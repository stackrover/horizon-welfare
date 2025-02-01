import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconEdit } from "@tabler/icons-react";
import React from "react";
import { useFormWrapper } from "./FormWrapper";
import InputField from "./InputField";
import { cn } from "@/lib/utils";

export default function EditableContent({
  name = "",
  content = "",
  editable = false,
  type = "text",
  children,
  className,
}: {
  name: string;
  content: string;
  editable?: boolean;
  children?: React.ReactNode;
  type?: "text" | "textarea" | "image" | "file" | "blogSelection";
  className?: string;
}) {
  const formCtx = useFormWrapper();

  if (!editable) return children || content;

  return (
    <Dialog>
      <div
        className={cn(
          "group relative w-full select-none border border-transparent py-1.5 text-inherit hover:border-black/20",
          className,
        )}
      >
        {children || content}

        <DialogTrigger asChild>
          <Button
            size="icon"
            variant="link"
            className="absolute right-0 top-0 z-50 hidden h-fit w-fit border bg-white p-1.5 shadow !outline-none group-hover:block"
          >
            <IconEdit size={20} strokeWidth={2} />
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent>
        <DialogHeader className="hidden">
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
        <div className="pt-4">
          <InputField
            name={name}
            type={type}
            className={type === "file" ? "aspect-[3/2] h-fit" : ""}
            defaultPreview={type === "file" ? content : ""}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Close
            </Button>
          </DialogClose>
          <Button
            disabled={formCtx.form.formState.isSubmitting}
            onClick={() => {
              formCtx.onSubmit();
            }}
          >
            {formCtx.form.formState.isSubmitting ? "Processing..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
