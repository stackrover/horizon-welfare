import { createLogger, format, transports, Logger } from "winston";

// Define custom formats
const { combine, timestamp, printf, colorize, errors } = format;

// Custom log format for clarity and consistency
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

// Logger function to create a logger with dynamic file names and levels
const createCustomLogger = ({
  filename = "application",
  level = "info",
  logToConsole = process.env.NODE_ENV !== "production", // log to console in dev mode
}: {
  filename?: string;
  level?: string;
  logToConsole?: boolean;
}): Logger => {
  // Initialize the logger
  const loggerInstance = createLogger({
    level, // Set the logging level
    format: combine(
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }), // Ensure error stack trace is logged
      logFormat,
    ),
    transports: [
      // Log to a file based on provided filename
      new transports.File({
        filename: `logs/${filename}.log`,
      }),
    ],
  });

  // Add console transport for development or debugging
  if (logToConsole) {
    loggerInstance.add(
      new transports.Console({
        format: combine(colorize(), logFormat), // Add color to console logs
      }),
    );
  }

  return loggerInstance;
};

// Example usage with default settings
const logger = createCustomLogger({
  filename: "app",
  level: "info",
  logToConsole: process.env.NODE_ENV !== "production",
});

export default logger;
