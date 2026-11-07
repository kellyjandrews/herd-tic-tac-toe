import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exposes the deployed commit so /api/health shows what is running.
  env: {
    NEXT_PUBLIC_GIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || "local",
    NEXT_PUBLIC_DEPLOY_ENV: process.env.VERCEL_ENV || "development",
  },
};

export default nextConfig;
