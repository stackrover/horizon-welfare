"use client";

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays } from "lucide-react";
import { Button } from "../ui/button";
import { format as formatDate } from "date-fns";

export default function DatePicker({
  value,
  onChange,
  format = "yyyy-MM-dd",
}: {
  value: string;
  onChange: (value?: string) => void;
  format?: string;
}) {
  const [date, setDate] = React.useState<Date>();

  React.useEffect(() => {
    if (value) {
      setDate(new Date(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          type="button"
          className="flex items-center gap-2 border-gray-300 px-3 text-black hover:bg-transparent hover:text-inherit"
        >
          <div className="flex-1 text-left">
            {date ? (
              formatDate(date, format)
            ) : (
              <span className="text-gray-500"> Select date</span>
            )}
          </div>
          <CalendarDays size={20} className="text-gray-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(data) => {
            setDate(data);
            onChange(data ? formatDate(data, format) : undefined);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
