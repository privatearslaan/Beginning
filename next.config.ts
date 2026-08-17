import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "utfs.io" },
      { protocol: "https", hostname: "uploadthing.com" },
      { protocol: "https", hostname: "**.ufs.sh" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "thehappytails.co.in" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};

export default nextConfig;
