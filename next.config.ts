import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** The service worker must never be cached, or app updates would not reach phones. */
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
      {
        // Android app download: phones must treat it as an installable package.
        source: "/app/salooni-transport.apk",
        headers: [
          { key: "Content-Type", value: "application/vnd.android.package-archive" },
          { key: "Content-Disposition", value: 'attachment; filename="salooni-transport.apk"' },
          { key: "Cache-Control", value: "no-cache" },
        ],
      },
      {
        source: "/.well-known/assetlinks.json",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
    ];
  },
  images: {
    /**
     * External image sources. Demo imagery is served from Unsplash —
     * when real photography is added to /public, these entries can be
     * removed and local paths used instead.
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
{
        protocol: "https",
        hostname: "media.istockphoto.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
