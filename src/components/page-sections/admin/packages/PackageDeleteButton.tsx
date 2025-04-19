"use client";

import { deletePackage } from "@/app/actions/admin/pages/package";
import { Button } from "@/components/ui/button";
import { IconLoader2, IconTrash } from "@tabler/icons-react";
import React from "react";
import toast from "react-hot-toast";

export default function PackageDeleteButton({
  packageId,
  refresh,
}: {
  packageId: number;
  refresh: VoidFunction;
}) {
  const [loading, setLoading] = React.useState(false);

  const handleDeleteAward = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this package? This action cannot be undone.",
    );

    if (!confirm) return;
    setLoading(true);

    const res = await deletePackage(packageId);
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
      disabled={loading}
      size="icon"
      variant="ghost"
      onClick={handleDeleteAward}
    >
      {loading ? (
        <IconLoader2 className="animate-spin" size={20} />
      ) : (
        <IconTrash size={20} />
      )}
    </Button>
  );
}
