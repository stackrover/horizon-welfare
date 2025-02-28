"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Project } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { match } from "ts-pattern";

export const SelectProject = ({
  value,
  onSelectChange,
}: {
  value: string;
  onSelectChange: (value: string) => void;
}) => {
  const { data, isLoading } = useSWR("/project/list");
  const projects: Project[] =
    data?.data?.results?.map((cat: Record<string, any>) => new Project(cat)) ||
    [];

  return (
    <Select value={value} onValueChange={onSelectChange}>
      <SelectTrigger>
        <SelectValue
          placeholder="Select a project"
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
                  No project found.
                </SelectItem>
              ))
              .otherwise(() =>
                projects.map((project) => (
                  <SelectItem key={project.id} value={project.id?.toString()}>
                    {project.title}
                  </SelectItem>
                )),
              ),
          )}
      </SelectContent>
    </Select>
  );
};
