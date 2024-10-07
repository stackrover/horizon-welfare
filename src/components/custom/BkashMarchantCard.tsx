import { cn } from "@/lib/utils";
import { IconCopy, IconShare3 } from "@tabler/icons-react";
import Image from "next/image";
import { Button } from "../ui/button";

export function BkashMarchantCard() {
  return (
    <div className="flex items-start rounded border bg-[#F9FAFB] p-8">
      <div className="flex-1">
        <h3 className="mb-4 text-xl font-bold leading-7 text-base-400">
          BKASH MERCHANT
        </h3>
        <table className="w-full">
          <tbody>
            <Tr>
              <Td>Mobile Number </Td>
              <Td className="font-bold text-base-400">01735648923</Td>
            </Tr>
            <Tr>
              <Td>BKASH NAME</Td>
              <Td className="font-bold text-base-400">
                HORIZON WELFARE ORGAINAZATION
              </Td>
            </Tr>
            <Tr>
              <Td>OR Code </Td>
              <Td className="font-bold text-base-400">
                <Image
                  src="/images/qr-code.png"
                  alt="qr"
                  width={100}
                  height={100}
                />
              </Td>
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
