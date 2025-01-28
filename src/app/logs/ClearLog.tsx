"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { mutate } from "swr";

export const ClearLog = () => {
  const [loading, setLoading] = useState(false);

  // clear the logs
  const clearLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/logs", {
        method: "POST",
        body: "",
      });
      if (res.ok) {
        toast.success("Log file cleared successfully");
        mutate((u: string) => u.includes("/api/logs"));
      }
    } catch (error) {
      toast.error("Error clearing log file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button size="sm" variant="secondary" onClick={() => clearLogs()}>
      {loading ? "Clearing..." : "Clear Logs"}
    </Button>
  );
};
