"use client";

import { deleteUser } from "@/app/actions/admin/user";
import { Button } from "@/components/ui/button";
import { IconLoader2, IconTrash } from "@tabler/icons-react";
import React from "react";
import toast from "react-hot-toast";

export default function UserDeleteButton({
  userId,
  refresh,
}: {
  userId: number;
  refresh: VoidFunction;
}) {
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async () => {
    const confirm = window.confirm(
      `Are you sure you want to  this user?`,
    );
    if (!confirm) return;

    setLoading(true);

    const res = await deleteUser(userId.toString());
    if (res.status === "success") {
      toast.success(res.message);
      refresh();
    } else {
      toast.error(res.message);
    }

    setLoading(false);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-gray-500 hover:text-red-500"
      onClick={handleDelete}
    >
      {loading ? <IconLoader2 className="animate-spin" /> : <IconTrash />}
    </Button>
  );
}
