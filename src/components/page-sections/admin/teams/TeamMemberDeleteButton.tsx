"use client";

import { deleteTeamMember } from "@/app/actions/admin/teams";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TeamMember } from "@/data";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import toast from "react-hot-toast";

export const TeamMemberDeleteButton = ({
  deleteItem,
  refresh,
}: {
  deleteItem: TeamMember;
  refresh: VoidFunction;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);

    try {
      const res = await deleteTeamMember(deleteItem.id);

      if (res.status !== "success") {
        throw new Error(res.message);
      }

      toast.success(res.status);
      setOpen(false);
      refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:bg-neutral-200"
        >
          <IconTrash size={20} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-normal">
            Delete <strong> {deleteItem.name} </strong>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to permanently delete{" "}
            <strong className="text-red-500"> {deleteItem.name} </strong>? This
            action cannot be undone
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="border-gray-300 text-gray-500">
            No, Cancel
          </AlertDialogCancel>
          <Button type="button" onClick={onDelete} variant="destructive">
            {isLoading ? "Deleting..." : "Yes, Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
