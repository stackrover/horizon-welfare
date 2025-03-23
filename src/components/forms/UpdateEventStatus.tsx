"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import _ from "lodash";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import { updateEventStatus } from "@/app/actions/admin/events";
import toast from "react-hot-toast";

export default function UpdateEventStatus({
  event,
  refresh,
}: {
  event: any;
  refresh: VoidFunction;
}) {
  const [status, setStatus] = React.useState(event.status);
  const [open, setOpen] = React.useState(false);

  // update event status
  const handleUpdateEventStatus = async (status: string) => {
    setStatus(status);

    const res = await updateEventStatus(event.id, status);

    console.log({ res });

    if (res.status === "success") {
      toast.success(res.message);
      refresh();
      setOpen(false);
    } else {
      setStatus(event.status);
      toast.error(res.message);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Badge
          variant={
            {
              upcoming: "warning",
              active: "info",
              pending: "warning",
              completed: "success",
              cancelled: "error",
            }[
              status as
                | "active"
                | "upcoming"
                | "pending"
                | "completed"
                | "cancelled"
            ] as any
          }
          className="gap-1.5 py-1.5 pr-1"
        >
          <span>{_.startCase(status as string)}</span>
          <ChevronDown size={15} />
        </Badge>
      </PopoverTrigger>

      <PopoverContent className="w-fit p-0.5">
        <Command>
          <CommandList>
            {["upcoming", "active", "pending", "completed", "cancelled"].map(
              (status) => (
                <CommandItem
                  key={status}
                  className="px-4 py-2 hover:bg-gray-100"
                  onSelect={() => handleUpdateEventStatus(status)}
                >
                  {_.startCase(status)}
                </CommandItem>
              ),
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
