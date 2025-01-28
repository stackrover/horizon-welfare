const getEnv = (key: string, initialValue?: string | number) => {
  return process.env[key] || initialValue;
};

export const config = {
  app: {
    name: getEnv("NEXT_PUBLIC_APP_NAME", "Horizon Welfare"),
    url: getEnv("NEXT_PUBLIC_APP_URL", "https://horizonwelfare.org/"),
  },

  auth: {
    secret: getEnv("AUTH_SECRET", "my-secret-key"),
  },

  api: {
    url: getEnv(
      "NEXT_PUBLIC_BACKEND_URL",
      "https://backend.horizonwelfare.org/api/v1",
    ),
    staticDataUrl: getEnv(
      "NEXT_PUBLIC_BACKEND_IMAGE_URL",
      "https://backend.horizonwelfare.org/public",
    ),
    location: getEnv("NEXT_PUBLIC_LOCATION_API_URL"),
  },
};
