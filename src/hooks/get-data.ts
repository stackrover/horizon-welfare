import { ERROR_OBJ_FORMAT } from "@/constants/error-obj-format";
import { fetcher } from "@/lib/fetcher";

export const getData = async (
  endpoint: string,
  token: string | undefined | null,
  opt?: any,
) => {
  try {
    const res = await fetcher(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      ...opt,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return { ...ERROR_OBJ_FORMAT, error };
  }
};
