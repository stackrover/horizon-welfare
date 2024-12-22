export const fetcher = async (endpoint: string, options: any) =>
  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`, options);
