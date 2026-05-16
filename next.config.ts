import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
