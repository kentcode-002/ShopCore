import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com"
      }
    ],
    domains: ["fakestoreapi.com", "fakestoreapi.com/images"]
  }
};

export default nextConfig;
