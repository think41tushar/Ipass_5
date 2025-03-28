import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Config options here */
  images: {
    remotePatterns: [
      {
        hostname: "icons8.com",
      },
    ],
  },

  // Add a rewrite to proxy backend requests through Next.js
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Match API routes
        destination: "https://syncdjango.site/:path*", // Use HTTPS if available
      },
    ];
  },

  // Allow CORS headers (if needed)
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Adjust based on security needs
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;


