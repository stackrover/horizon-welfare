"use client";

import { Button } from "@/components/ui/button";
import { IconLoader2, IconTrash } from "@tabler/icons-react";
import React from "react";
import toast from "react-hot-toast";
import { deleteProject } from "../../app/actions/admin/pages/campaigns";

export default function ProjectDeleteButton({
  projectId,
  refresh,
}: {
  projectId: number;
  refresh: VoidFunction;
}) {
  const [loading, setLoading] = React.useState(false);

  const handleDeleteEvent = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this project?",
    );
    if (!confirm) return;

    setLoading(true);

    const res = await deleteProject(projectId);
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
      onClick={handleDeleteEvent}
    >
      {loading ? <IconLoader2 className="animate-spin" /> : <IconTrash />}
    </Button>
  );
}
