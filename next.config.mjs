/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend.horizonwelfare.org",
        port: "",
        pathname: "/public/**",
      },
    ],
  },
};

export default nextConfig;
