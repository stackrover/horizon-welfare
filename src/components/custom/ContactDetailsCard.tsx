import { cn } from "@/lib/utils";
import { IconCopy, IconShare3 } from "@tabler/icons-react";
import { Button } from "../ui/button";

export function ContactDetailsCard() {
  return (
    <div className="flex items-start rounded border bg-[#F9FAFB] p-8">
      <div className="flex-1">
        <table className="w-full">
          <tbody>
            <Tr>
              <Td>Head of Project</Td>
              <Td className="font-bold text-base-400">Abdur Razaak</Td>
            </Tr>
            <Tr>
              <Td>E-mail </Td>
              <Td className="font-bold text-base-400">
                abdurrazzak@horizonwelfare.com
              </Td>
            </Tr>
            <Tr>
              <Td>Contact</Td>
              <Td className="font-bold text-base-400">0176345728</Td>
            </Tr>
            <Tr>
              <Td>Status</Td>
              <Td className="font-bold text-base-400">Running</Td>
            </Tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-y-2">
        <Button
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
