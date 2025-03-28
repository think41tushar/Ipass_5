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

  // Add a rewrite to proxy HTTP backend requests through Next.js
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Match API routes
        destination: "https://ec2-3-91-217-18.compute-1.amazonaws.com:8000/:path*", // Use HTTPS backend
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
            value: "GET,POST,PUT,DELETE,OPTIONS",
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

