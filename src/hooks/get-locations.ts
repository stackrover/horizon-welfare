import axiosInstance from "@/lib/axios";

export const getLocationData = async (endpoint: string) => {
  const { data } = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_LOCATION_API_URL}${endpoint}`,
  );
  if (data.status.code === 200) {
    return data.data;
  }
  return null;
};
