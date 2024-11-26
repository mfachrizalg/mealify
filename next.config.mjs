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
  async redirects() {
    return [
      {
        source: "/", // Halaman asal
        destination: "/home", // Halaman tujuan
        permanent: true, // Set true untuk redirect permanen (301)
      },
    ];
  },
};

export default nextConfig;
