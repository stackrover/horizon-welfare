"use client";

import { addTeamMember } from "@/app/actions/admin/teams";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { teamMemberEntryFormSchema } from "@/schemas/teamMemberFormSchema";
import { IconX } from "@tabler/icons-react";
import { Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import TeamEntryForm from "./TeamEntryForm";

export default function TeamMemberAddButton({
  refresh,
}: {
  refresh: VoidFunction;
}) {
  const onSubmit = async (formData: FormData, form: UseFormReturn) => {
    try {
      const res = await addTeamMember(formData);
      if (res.status === "success") {
        toast.success(res.message);
        form.reset();
        refresh();
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button>
          <Plus />
          <span> Team member </span>
        </Button>
      </DrawerTrigger>

      <DrawerContent className="inset-x-auto inset-y-0 right-0 m-4 w-full max-w-[400px] rounded-md after:!bg-transparent">
        <DrawerHeader className="flex items-center justify-between border-b">
          <DrawerTitle> Add team member </DrawerTitle>
          <DrawerDescription className="hidden" />
          <DrawerClose asChild>
            <Button size="icon" variant="ghost" className="size-9">
              <IconX size={20} />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <ScrollArea className="h-full flex-1 p-4">
          <TeamEntryForm
            onSubmit={onSubmit as any}
            formSchema={teamMemberEntryFormSchema}
          />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
