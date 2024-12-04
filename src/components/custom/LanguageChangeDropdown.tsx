"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, GlobeIcon } from "@radix-ui/react-icons";

export function LanguageChangeDropdown({
  className,
  value,
  setValue,
}: {
  className?: string;
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex h-[45px] w-[100px] items-center justify-between gap-1 rounded border px-3",
            className,
          )}
        >
          <GlobeIcon />
          <span className="flex-1 text-left">{value}</span>
          <ChevronDownIcon className="justify-end" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[100px]">
        <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
          <DropdownMenuRadioItem value="ENG">ENG</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="BN">BN</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
