"use client";

import React from "react";
import { deleteAward } from "@/app/actions/admin/award";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { IconTrash } from "@tabler/icons-react";

export default function AwardDeleteButton({
  awardId,
  refresh,
}: {
  awardId: number;
  refresh: VoidFunction;
}) {
  const handleDeleteAward = async () => {
    const res = await deleteAward(awardId);
    if (res.status === "success") {
      toast.success(res.message);
      refresh();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Button size="icon" variant="ghost" onClick={handleDeleteAward}>
      <IconTrash size={20} />
    </Button>
  );
}
