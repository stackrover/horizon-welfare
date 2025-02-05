import { ERROR_OBJ_FORMAT } from "@/constants/error-obj-format";
import { fetcher } from "@/lib/fetcher";

export const getVolunteerProfile = async (
  userId: number | string | undefined,
  token: string | undefined | null,
) => {
  try {
    const res = await fetcher(`/volunteer/profile/show/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return { ...ERROR_OBJ_FORMAT, error };
  }
};
