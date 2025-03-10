"use client";

import { editTeamMember } from "@/app/actions/admin/teams";
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
import { teamMemberUpdateFormSchema } from "@/schemas/teamMemberFormSchema";
import { IconEdit, IconX } from "@tabler/icons-react";
import { UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import TeamEntryForm from "./TeamEntryForm";
import { TeamMember } from "@/data";

export function TeamMemberDataEditButton({
  editData,
  refresh,
}: {
  editData: TeamMember;
  refresh: VoidFunction;
}) {
  const onSubmit = async (formData: FormData, form: UseFormReturn) => {
    try {
      const res = await editTeamMember(formData, editData.id);
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
        <Button
          size="icon"
          variant="ghost"
          className="text-gray-500 hover:bg-neutral-200"
        >
          <IconEdit size={20} />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="inset-x-auto inset-y-0 right-0 m-4 w-full max-w-[400px] rounded-md after:!bg-transparent">
        <DrawerHeader className="flex items-center justify-between border-b">
          <DrawerTitle> Edit team member </DrawerTitle>
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
            formSchema={teamMemberUpdateFormSchema}
            defaultValues={{
              name: editData.name,
              position: editData.position,
              facebook_link: editData.facebookLink,
              twitter_link: editData.twitterLink,
              linkedin_link: editData.linkedinLink,
              status: editData.status,
            }}
            preview={editData.image}
          />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
