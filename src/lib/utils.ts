import { config } from "@/utils/config";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Returns the full URL for an image or an empty string if no source is provided.
export const getImageURL = (src?: string): string => {
  if (!src) return "";

  // Remove leading slash if it exists
  const normalizedSrc = src.replace(/^\/+/, "");

  return `${config.get("api.staticDataUrl")}/${normalizedSrc}`;
};
