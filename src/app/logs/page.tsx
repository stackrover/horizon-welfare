import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { config } from "@/utils/config";
import { ClearLog } from "./ClearLog";

interface LogEntry {
  time: string;
  type: string;
  message: string;
}

export default async function LoggerDetails() {
  const res = await fetch(`${config.get("app.url")}/api/logs`, {
    next: { tags: ["APP_LOGS"] },
    cache: "no-cache",
  });

  const data = await res.json();

  const parseLogs = (log: string): LogEntry[] => {
    const logEntries: LogEntry[] = [];

    // Split logs by lines and parse each log entry
    const lines = log.split("\n");
    lines.forEach((line) => {
      const match = line.match(/^(\S+ \S+) \[(\w+)\]: (.+)/);
      if (match) {
        logEntries.push({
          time: match[1], // Extracted time (e.g., 2025-01-28 12:34:56)
          type: match[2], // Extracted log level (e.g., info, error)
          message: match[3], // Extracted message (e.g., User fetched successfully)
        });
      }
    });

    // Sort logs by time in descending order
    return logEntries.sort((a, b) =>
      a.time < b.time ? 1 : a.time > b.time ? -1 : 0,
    );
  };

  const logs = parseLogs(data.log);

  return (
    <div className="p-10">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-center font-bold"> App Logs</h2>
        <ClearLog />
      </div>

      {logs.length > 0 ? (
        <div className="flex h-full flex-col overflow-hidden border">
          {/* Header Row */}
          <div className="grid grid-cols-[200px_100px_1fr] items-center border-b text-sm text-gray-500 [&_div]:px-4 [&_div]:py-1.5">
            <div className="border-r">
              <strong>Time</strong>
            </div>
            <div className="border-r">
              <strong>Type</strong>
            </div>
            <div>
              <strong>Message</strong>
            </div>
          </div>

          {/* Log Entries */}
          <ScrollArea className="flex-1">
            {logs.map((log, index) => (
              <div
                className={cn(
                  "grid h-fit cursor-default select-none grid-cols-[200px_100px_1fr] border-b text-sm last:border-b-0 even:bg-gray-50 [&_div]:px-4 [&_div]:py-1",
                  log.type === "error" && "bg-red-50",
                  log.type === "warn" && "bg-yellow-50",
                )}
                key={index}
              >
                <div className="border-r font-semibold text-gray-500">
                  {log.time}
                </div>
                <div
                  className={cn(
                    "border-r font-semibold text-gray-500",
                    log.type === "error" && "text-red-500",
                  )}
                >
                  {log.type}
                </div>
                <div>{log.message}</div>
              </div>
            ))}
          </ScrollArea>
        </div>
      ) : (
        <p>No logs available</p>
      )}
    </div>
  );
}
