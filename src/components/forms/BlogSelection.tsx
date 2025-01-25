import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useSWR } from "@/hooks/use-swr";
import { getImageURL } from "@/lib/utils";
import { CommandLoading } from "cmdk";
import Image from "next/image";

export const BlogSelection = ({
  value,
  onSelect,
}: {
  value: string;
  onSelect: (blogId: string) => void;
}) => {
  const { data, isLoading } = useSWR("/blog/list/all");

  console.log({ value });

  return (
    <Command>
      <CommandInput />
      <CommandList>
        {isLoading && <CommandLoading> Loading...</CommandLoading>}
        <CommandEmpty>No results found.</CommandEmpty>
        {data?.data?.results?.map((item: Record<string, any>) => (
          <CommandItem
            data-active={item.id === +value}
            key={item.id}
            value={item.id?.toString()}
            className="group border-b border-gray-200 data-[active=true]:bg-primary"
            onSelect={(val) => onSelect(val)}
          >
            <div className="grid grid-cols-[48px_1fr] gap-2">
              <Image
                alt=""
                src={getImageURL(item.thumbnail)}
                width={48}
                height={48}
                className="rounded-md"
              />

              <div>
                <h4 className="font-bold group-data-[active=true]:text-white">
                  {item.title}
                </h4>
                <p className="text-gray-500 group-data-[active=true]:text-white/70">
                  - {item.author_name}
                </p>
              </div>
            </div>
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
};
