"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components//ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { BlogCategory } from "@/data/blogs/blog-category";
import { useSWR } from "@/hooks/use-swr";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { CommandLoading } from "cmdk";
import { useEffect, useState } from "react";

type PropsType = {
  value: number | string;
  onSelectChange: (category: BlogCategory) => void;
};

export default function SelectBlogCategory({
  value,
  onSelectChange,
}: PropsType) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<BlogCategory>();

  const handleSelectChange = (cat: BlogCategory) => {
    setSelected(cat);
    onSelectChange(cat);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex h-10 w-full items-center justify-start rounded-md border border-input bg-transparent px-3 py-1 text-left text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
        {selected ? (
          <span className="flex-1"> {selected.getTitle()} </span>
        ) : (
          <span className="flex-1 text-gray-500"> Select category </span>
        )}

        <CaretSortIcon className="h-4 w-4 opacity-50" />
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <BlogCategoryList
          value={value}
          onSelectChange={handleSelectChange}
          onClose={() => setOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
}

const BlogCategoryList = ({
  value,
  onSelectChange,
  onClose,
}: PropsType & { onClose: VoidFunction }) => {
  const { data, isLoading } = useSWR("/blog/category/list");

  useEffect(() => {
    if (!data || !isLoading || !value) return;

    const current = data?.data?.results?.find((d: any) => d.id === +value);
    onSelectChange(current);
  }, [value, data, isLoading]);

  return (
    <Command>
      <CommandInput />
      <CommandList>
        {isLoading ? (
          <CommandLoading> Loading... </CommandLoading>
        ) : (
          <CommandEmpty> No category found. </CommandEmpty>
        )}
        <CommandGroup>
          {!isLoading &&
            data?.data?.results?.length &&
            data?.data?.results
              ?.map((d: any) => new BlogCategory(d))
              .map((cat: BlogCategory) => (
                <CommandItem
                  key={cat.getId()}
                  onSelect={() => {
                    onSelectChange(cat);
                    onClose();
                  }}
                >
                  <span className="flex-1">{cat.getTitle()}</span>
                  {cat.getId() === value && <CheckIcon className="h-4 w-4" />}
                </CommandItem>
              ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
