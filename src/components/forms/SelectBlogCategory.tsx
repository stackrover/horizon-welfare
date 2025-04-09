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
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { IconLoader2, IconTrash } from "@tabler/icons-react";
import { CommandLoading } from "cmdk";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { deleteBlogCategory } from "../../app/actions/admin/blogs";

type PropsType = {
  value: number | string;
  onSelectChange: (category: BlogCategory) => void;
  data: any;
  isLoading: boolean;
  refresh: () => void;
};

export default function SelectBlogCategory({
  value,
  onSelectChange,
  data,
  isLoading,
  refresh,
}: PropsType) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<BlogCategory>();

  // const { data, isLoading } = useSWR("/blog/category/list");

  const updateDefaultValues = useCallback(() => {
    if (!data || isLoading || !value) return;
    const current = data?.data?.results?.find((d: any) => d.id === +value);
    setSelected(new BlogCategory(current));
    onSelectChange(new BlogCategory(current));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, data, isLoading]);

  useEffect(() => {
    updateDefaultValues();
  }, [updateDefaultValues]);

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
          data={data?.data?.results || []}
          value={value}
          onSelectChange={handleSelectChange}
          onClose={() => setOpen(false)}
          isLoading={isLoading}
          refresh={refresh}
        />
      </PopoverContent>
    </Popover>
  );
}

const BlogCategoryList = ({
  value,
  onSelectChange,
  onClose,
  isLoading,
  data,
  refresh,
}: PropsType & {
  isLoading?: boolean;
  data: Record<string, any>[];
  onClose: VoidFunction;
}) => {
  const [selectedId, setSelectedId] = React.useState<number | string | null>(
    null,
  );
  const [loading, setLoading] = React.useState(false);

  const handleCategoryDelete = async (id: string | number) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this category? Be careful, Category related all blogs will be deleted.",
    );

    if (!confirm) return;
    setLoading(true);
    setSelectedId(id);

    const response = await deleteBlogCategory(id);

    if (response.status === "success") {
      toast.success(response.message);
      refresh();
    } else {
      toast.error(response.message);
    }

    setLoading(false);
    setSelectedId(null);
  };
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
            data?.length &&
            data
              ?.map((d: any) => new BlogCategory(d))
              .map((cat: BlogCategory) => (
                <CommandItem
                  className="relative z-10 flex items-center justify-between"
                  key={cat.getId()}
                  onSelect={() => {
                    onSelectChange(cat);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex-1">{cat.getTitle()}</span>
                    {cat.getId() === +value && (
                      <CheckIcon className="h-4 w-4" />
                    )}
                  </div>
                  <button
                    disabled={loading}
                    className="absolute right-1.5 top-1/2 z-40 -translate-y-1/2 rounded bg-destructive/10 p-1 text-destructive hover:bg-destructive/20 disabled:bg-base-100 disabled:text-base-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleCategoryDelete(cat.getId());
                    }}
                    type="button"
                  >
                    {loading && selectedId === cat.getId() ? (
                      <IconLoader2 size={16} className="animate-spin" />
                    ) : (
                      <IconTrash size={16} />
                    )}
                  </button>
                </CommandItem>
              ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
