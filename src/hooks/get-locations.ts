import axiosInstance from "@/lib/axios";

export const getLocationData = async (endpoint: string) => {
  try {
    const { data } = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_LOCATION_API_URL}${endpoint}`,
    );
    if (data.status.code === 200) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching location data:", error);
    return null;
  }
};
