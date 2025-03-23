"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { IconTrash } from "@tabler/icons-react";
import { deleteEvent } from "@/app/actions/admin/events";
import toast from "react-hot-toast";

export default function EventDeleteButton({
  eventId,
  refresh,
}: {
  eventId: number;
  refresh: VoidFunction;
}) {
  const handleDeleteEvent = async () => {
    const res = await deleteEvent(eventId.toString());
    if (res.status === "success") {
      toast.success(res.message);
      refresh();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-gray-500 hover:text-red-500"
      onClick={handleDeleteEvent}
    >
      <IconTrash />
    </Button>
  );
}
