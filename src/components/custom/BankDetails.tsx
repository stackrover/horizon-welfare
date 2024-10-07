import { cn } from "@/lib/utils";
import { IconCopy, IconShare3 } from "@tabler/icons-react";
import { Button } from "../ui/button";

export function BankDetails() {
  return (
    <div className="flex items-start rounded border bg-[#F9FAFB] p-8">
      <div className="flex-1">
        <h3 className="mb-4 text-xl font-bold leading-7 text-base-400">
          Directly Bank Transfer
        </h3>
        <table className="w-full">
          <tbody>
            <Tr>
              <Td>Account Number</Td>
              <Td className="font-bold text-base-400">2223330000456987</Td>
            </Tr>
            <Tr>
              <Td>Beneficiary Name </Td>
              <Td className="font-bold text-base-400">
                ISLAMI BANK BANGLADESH LIMITED
              </Td>
            </Tr>
            <Tr>
              <Td>IFSC Code </Td>
              <Td className="font-bold text-base-400">IBBLPLC</Td>
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
