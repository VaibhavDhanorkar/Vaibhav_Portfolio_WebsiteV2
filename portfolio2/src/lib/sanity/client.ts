import { createClient } from "next-sanity";
import { getEnv } from "@/lib/env";

export const REVALIDATE_SECONDS = 3600;

export function getSanityClient() {
  const env = getEnv();
  return createClient({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2024-01-01",
    useCdn: true,
    token: env.SANITY_API_READ_TOKEN,
  });
}

export function getSanityWriteClient(token: string) {
  const env = getEnv();
  return createClient({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2024-01-01",
    useCdn: false,
    token,
  });
}
