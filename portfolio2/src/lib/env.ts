import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1).default("production"),
  SANITY_API_READ_TOKEN: z.string().min(1).optional(),
  PORT: z.coerce.number().int().positive().optional(),
  REQUIRED_ASSETS: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

let cached: Env | null = null;

export function getEnv(): Env {
  if (cached) return cached;

  const parsed = envSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
    PORT: process.env.PORT,
    REQUIRED_ASSETS: process.env.REQUIRED_ASSETS,
  });

  if (!parsed.success) {
    const missing = parsed.error.issues
      .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(
      `Missing or invalid environment variables:\n${missing}\n\nCopy .env.example to .env.local and fill in the values.`
    );
  }

  cached = parsed.data;
  return cached;
}
