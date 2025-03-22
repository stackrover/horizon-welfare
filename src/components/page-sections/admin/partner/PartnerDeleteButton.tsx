"use client";

import { deletePartner } from "@/app/actions/admin/partner";
import { Button } from "@/components/ui/button";
import { IconTrash } from "@tabler/icons-react";
import toast from "react-hot-toast";

export function PartnerDeleteButton({
  id,
  refresh,
}: {
  id: number;
  refresh: VoidFunction;
}) {
  const handleDeleteAward = async () => {
    const res = await deletePartner(id);
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
