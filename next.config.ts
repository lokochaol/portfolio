import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/portfolio",
  // Canonical URLs carry no trailing slash; /portfolio/ redirects (308) to /portfolio.
  trailingSlash: false,
};

export default nextConfig;
