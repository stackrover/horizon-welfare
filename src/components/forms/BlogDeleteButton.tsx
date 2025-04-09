"use client";

import { deleteBlog } from "@/app/actions/admin/blogs";
import { Button } from "@/components/ui/button";
import { IconLoader2, IconTrash } from "@tabler/icons-react";
import React from "react";
import toast from "react-hot-toast";

export default function BlogDeleteButton({
  blogId,
  refresh,
}: {
  blogId: number;
  refresh: VoidFunction;
}) {
  const [loading, setLoading] = React.useState(false);

  const handleDeleteBlog = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?",
    );
    if (!confirm) return;

    setLoading(true);

    const res = await deleteBlog(blogId.toString());
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
      onClick={handleDeleteBlog}
    >
      {loading ? <IconLoader2 className="animate-spin" /> : <IconTrash />}
    </Button>
  );
}
