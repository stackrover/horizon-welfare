import axios from "@/lib/axios";
import useSWRInstance, { SWRConfiguration } from "swr";

// Filters and validates query params, keeps only truthy string values
const validQueryObj = <T extends Record<string, any>>(
  query: T,
): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(query).filter(
      ([, value]) => Boolean(value) && typeof value === "string",
    ),
  ) as Record<string, string>;
};

// Fetcher function for SWR GET requests
const fetcher = (url: string) => axios.get(url);

// Custom SWR hook for handling URL params and data fetching
export const useSWR = (
  url: string,
  query?: Record<string, string>,
  options?: SWRConfiguration,
) => {
  const sp = new URLSearchParams(validQueryObj(query || {}));
  const { data, error, isLoading, mutate } = useSWRInstance(
    `${url}?${sp.toString()}`,
    fetcher,
    { shouldRetryOnError: false, ...options },
  );

  return {
    refresh: mutate,
    data,
    isLoading,
    isError: error,
  };
};
