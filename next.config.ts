import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hlwyscthkuohbrksklnn.supabase.co",
      },
    ],
  },
};

export default nextConfig;
