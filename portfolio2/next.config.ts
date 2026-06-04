import type { NextConfig } from "next";
import { getEnv } from "./src/lib/env";
import { validateAssets } from "./src/lib/validate-assets";

const env = getEnv();
const requiredAssets = env.REQUIRED_ASSETS
  ? env.REQUIRED_ASSETS.split(",").map((s) => s.trim()).filter(Boolean)
  : [];

validateAssets({ requiredAssets });

const nextConfig: NextConfig = {
  transpilePackages: ["sanity", "next-sanity"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
