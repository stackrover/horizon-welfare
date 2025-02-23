"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectCategory } from "@/data/projects/category";
import { useSWR } from "@/hooks/use-swr";
import { match } from "ts-pattern";

export const SelectProjectCategory = ({
  value,
  onSelectChange,
}: {
  value: string;
  onSelectChange: (value: string) => void;
}) => {
  const { data, isLoading } = useSWR("/project/category/list");
  const projects: ProjectCategory[] =
    data?.data?.results?.map(
      (cat: Record<string, any>) => new ProjectCategory(cat),
    ) || [];

  return (
    <Select value={value} onValueChange={onSelectChange}>
      <SelectTrigger>
        <SelectValue
          placeholder="Select a category"
          className="data-[placeholder]:text-gray-500"
        />
      </SelectTrigger>
      <SelectContent>
        {match(isLoading)
          .with(true, () => (
            <SelectItem value="loading" disabled>
              Loading...
            </SelectItem>
          ))
          .otherwise(() =>
            match(projects.length)
              .with(0, () => (
                <SelectItem value="none" disabled>
                  No category found.
                </SelectItem>
              ))
              .otherwise(() =>
                projects.map((category) => (
                  <SelectItem
                    key={category.getId()}
                    value={category.getId()?.toString()}
                  >
                    {category.getTitle()}
                  </SelectItem>
                )),
              ),
          )}
      </SelectContent>
    </Select>
  );
};
