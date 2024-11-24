/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**", // Matches all hostnames
      },
      {
        protocol: "https",
        hostname: "**", // Matches all hostnames
      },
    ],
  },
};

export default nextConfig;
