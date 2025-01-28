export const config = {
  app: {
    name: process.env["NEXT_PUBLIC_APP_NAME"],
    url: process.env["NEXT_PUBLIC_APP_URL"],
  },

  auth: {
    secret: process.env["AUTH_SECRET"],
  },

  api: {
    url: process.env["NEXT_PUBLIC_BACKEND_URL"],
    staticDataUrl: process.env["NEXT_PUBLIC_BACKEND_IMAGE_URL"],
    location: process.env["NEXT_PUBLIC_LOCATION_API_URL"],
  },
};
