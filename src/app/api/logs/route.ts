import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";
import { revalidatePath, revalidateTag } from "next/cache";

// Path to the log file you want to read
const logFilePath = path.join(process.cwd(), "logs/app.log");

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check if the log file exists
    if (!fs.existsSync(logFilePath)) {
      return res.status(404).json({ message: "Log file not found" });
    }

    // Read the log file
    const logData = fs.readFileSync(logFilePath, "utf-8");

    // Return the log data as a response
    return Response.json({ log: logData });
  } catch (error) {
    console.error("Error reading log file:", error);
    return Response.json({ error: "Error reading log file" });
  }
}

// POST request to clear the log file
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check if the log file exists
    if (!fs.existsSync(logFilePath)) {
      return Response.json({ message: "Log file not found" }, { status: 404 });
    }

    // Clear the log file (truncate its content)
    fs.truncateSync(logFilePath, 0);

    // Return a success response
    return Response.json(
      { message: "Log file cleared successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error clearing log file:", error);
    return Response.json({ error: "Error clearing log file" }, { status: 500 });
  }
}
