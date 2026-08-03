import type { NextConfig } from "next";

const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  output: staticExport ? "export" : undefined,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 100],
    unoptimized: staticExport,
  },
};

export default nextConfig;
