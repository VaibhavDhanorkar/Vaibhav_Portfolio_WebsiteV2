import { z } from "zod";
import { getEnv } from "./env";

const serverEnvSchema = z.object({
  SANITY_API_READ_TOKEN: z.string().min(1),
  SANITY_REVALIDATE_SECRET: z.string().min(1).optional(),
});

export type ServerEnv = ReturnType<typeof getEnv> & z.infer<typeof serverEnvSchema>;

let cached: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (cached) return cached;

  const base = getEnv();
  const parsed = serverEnvSchema.safeParse({
    SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
    SANITY_REVALIDATE_SECRET: process.env.SANITY_REVALIDATE_SECRET,
  });

  if (!parsed.success) {
    const missing = parsed.error.issues
      .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(
      `Missing or invalid server environment variables:\n${missing}\n\nAdd them to .env.local (see .env.example).`
    );
  }

  cached = { ...base, ...parsed.data };
  return cached;
}
