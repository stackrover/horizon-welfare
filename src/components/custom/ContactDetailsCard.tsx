import { cn } from "@/lib/utils";
import { ManagerType } from "@/types/types";
import { IconCopy, IconShare3 } from "@tabler/icons-react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

export function ContactDetailsCard({ manager }: { manager: ManagerType }) {
  // Manager data copy to clipboard handler
  const copyManagerDataAsTSV = () => {
    // Transform manager object into key-value pairs
    const reformedManagerData = {
      "Head-of-Project": manager.managerName,
      Email: manager.email,
      Contact: manager.mobile,
      Status: manager.status,
    };

    // Convert key-value pairs to TSV format
    const tsvData = Object.entries(reformedManagerData)
      .map(([key, value]) => `${key}\t${value}`) // Each line is "key\tvalue"
      .join("\n"); // Join lines with newline characters

    // Copy TSV to the clipboard
    navigator.clipboard
      .writeText(tsvData)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy");
      });
  };

  return (
    <div className="flex items-start rounded border bg-[#F9FAFB] p-8">
      <div className="flex-1">
        <table className="w-full text-sm md:text-base">
          <tbody>
            <Tr>
              <Td>Head of Project</Td>
              <Td className="font-bold text-base-400">{manager.managerName}</Td>
            </Tr>
            <Tr>
              <Td>E-mail </Td>
              <Td className="font-bold text-base-400">{manager.email}</Td>
            </Tr>
            <Tr>
              <Td>Contact</Td>
              <Td className="font-bold text-base-400">{manager.mobile}</Td>
            </Tr>
            <Tr>
              <Td>Status</Td>
              <Td className="font-bold text-base-400">{manager.status}</Td>
            </Tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-y-2">
        <Button
          onClick={copyManagerDataAsTSV}
          variant="light"
          size="icon"
          className="rounded-full shadow-none"
        >
          <IconCopy size={20} />
        </Button>
        <Button
          variant="light"
          size="icon"
          className="rounded-full shadow-none"
        >
          <IconShare3 size={20} />
        </Button>
      </div>
    </div>
  );
}

const Tr = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <tr className={cn("", className)}>{children}</tr>;
};

const Td = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <td className={cn("py-2 text-base-300", className)}>{children}</td>;
};
