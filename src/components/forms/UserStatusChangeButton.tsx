"use client";

import { statusChange } from "@/app/actions/admin/user";
import { Button } from "@/components/ui/button";
import { IconBan, IconCircleCheck, IconLoader2 } from "@tabler/icons-react";
import React from "react";
import toast from "react-hot-toast";

export default function UserStatusChangeButton({
  userId,
  status,
  refresh,
}: {
  userId: number;
  status: string;
  refresh: VoidFunction;
}) {
  const [loading, setLoading] = React.useState(false);

  const handleStatusChange = async (panelAccess: string) => {
    const confirm = window.confirm(
      `Are you sure you want to ${panelAccess === "yes" ? "inactive" : "active"} this user?`,
    );
    if (!confirm) return;

    setLoading(true);

    const fd = new FormData();
    fd.append("panelAccess", panelAccess === "yes" ? "no" : "yes");

    const res = await statusChange(userId.toString(), fd);
    if (res.status === "success") {
      toast.success(res.message);
      refresh();
    } else {
      toast.error(res.message);
    }

    setLoading(false);
  };

  return (
    <div>
      {status === "yes" ? (
        <Button
          variant="ghost"
          disabled={loading}
          size="icon"
          className="text-gray-500 hover:text-red-500"
          onClick={() => handleStatusChange(status)}
        >
          {loading ? <IconLoader2 className="animate-spin" /> : <IconBan />}
        </Button>
      ) : (
        <Button
          disabled={loading}
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-green-600"
          onClick={() => handleStatusChange(status)}
        >
          {loading ? (
            <IconLoader2 className="animate-spin" />
          ) : (
            <IconCircleCheck />
          )}
        </Button>
      )}
    </div>
  );
}
