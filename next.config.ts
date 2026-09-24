import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained server bundle for small container images.
  // Vercel ignores this; it is used by the Dockerfile (`node server.js`).
  output: "standalone",
};

export default nextConfig;
