"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IconCloudDownload,
  IconCopy,
  IconFileTypeCsv,
  IconFileTypeXls,
} from "@tabler/icons-react";

import ExcelJS from "exceljs";
import saveAs from "file-saver";
import toast from "react-hot-toast";

export function ExportFile<T>({ columns, data }: { columns: any; data: T[] }) {
  // data copying handler function
  const handleCopy = async () => {
    // Filter and transform data according to column structure
    const filteredData = data.map((row: any) => {
      const filteredRow: any = {};
      columns
        .filter((col: any) => col.id !== "actions" && col.id !== "sl")
        .forEach((col: any) => {
          filteredRow[col.header] = row[col.id];
        });
      console.log(filteredRow);
      return filteredRow;
    });

    console.log(filteredData);

    // Convert data to tab-separated string
    const dataToCopy = () => {
      if (filteredData.length > 0) {
        // Get headers from the first row
        let copyData = `${Object.keys(filteredData[0]).join("\t")}\n`;

        // Add data rows
        filteredData.forEach((row: any) => {
          copyData += `${Object.values(row).join("\t")}\n`;
        });

        return copyData;
      }
      return "";
    };

    const copyDataAll = dataToCopy();

    // Copy data to clipboard with correct format
    if (copyDataAll) {
      const clipboardData = new Blob([copyDataAll], {
        type: "text/plain",
      });
      const clipboardItem = new ClipboardItem({
        "text/plain": clipboardData,
      });

      try {
        await navigator.clipboard.write([clipboardItem]);
        toast.success("Copied data to clipboard");
      } catch (error) {
        console.error("Clipboard write failed:", error);
        toast.error("Failed to copy data to clipboard");
      }
    } else {
      toast.error("No data to copy");
    }
  };

  // Excel export function using ExcelJS
  const handleExportClick = async () => {
    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    // Get column headers from data keys
    const columnHeaders = columns
      .filter((col: any) => col.id !== "actions" && col.id !== "sl")
      .map((col: any) => ({
        header: col.header,
        key: col.id,
      }));

    // Add the column headers to the worksheet
    worksheet.columns = columnHeaders;

    // Add the data rows to the worksheet
    data.forEach((row: any) => {
      worksheet.addRow(row);
    });

    // Set custom styles (optional)
    worksheet.getRow(1).font = { bold: true }; // Bold the header row

    // Create the Excel file as a blob and trigger download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });

    // Trigger the download
    saveAs(blob, "table_data.xlsx");
  };

  // Function to convert the array of objects to CSV
  const generateCsvContent = (data: any[]) => {
    if (data.length === 0) return "";

    // Extract headers
    const headers = Object.keys(data[0]).join(",");

    // Extract rows
    const rows = data.map((row) => Object.values(row).join(",")).join("\n");

    // Combine headers and rows
    return `${headers}\n${rows}`;
  };

  // csv file download function
  const handleExportCSV = async () => {
    // Filter and transform data according to column structure
    const filteredData = data.map((row: any) => {
      const filteredRow: any = {};
      columns
        .filter((col: any) => col.id !== "actions" && col.id !== "sl")
        .forEach((col: any) => {
          filteredRow[col.header] = row[col.id];
        });
      return filteredRow;
    });

    // generate csv file
    const csvContent = generateCsvContent(filteredData);

    // Create a blob with the CSV content
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    // Create a link and trigger the download
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = "data.csv";
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        asChild
        className="focus-visible:ring-0 focus-visible:ring-offset-0"
      >
        <Button variant="secondary" className="gap-2" disabled={!data.length}>
          <IconCloudDownload size={20} />
          <span>Export</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="--radix-dropdown-menu-trigger-width"
      >
        <DropdownMenuGroup>
          {/* copy to clipboard button  */}
          <DropdownMenuItem
            onClick={handleCopy}
            className="flex cursor-pointer items-center gap-2 text-base-400"
          >
            <IconCopy size={18} />
            <span>Copy</span>
          </DropdownMenuItem>

          {/* download csv button  */}
          <DropdownMenuItem
            onClick={handleExportCSV}
            className="flex cursor-pointer items-center gap-2 text-base-400"
          >
            <IconFileTypeCsv className="text-base-400" size={18} />
            <span>CSV</span>
          </DropdownMenuItem>

          {/* download excel button  */}
          <DropdownMenuItem
            onClick={handleExportClick}
            className="flex cursor-pointer items-center gap-2 text-base-400"
          >
            <IconFileTypeXls className="text-base-400" size={18} />
            <span>XLSX</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
