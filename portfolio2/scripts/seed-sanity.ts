/**
 * One-time seed: copies src/data/* into Sanity.
 *
 * Usage:
 *   1. Copy .env.example → .env.local and set Sanity credentials
 *   2. Create a write token at sanity.io/manage → API → Tokens
 *   3. npm run seed:sanity
 */
import { config } from "dotenv";
import { createClient } from "@sanity/client";
import { profile } from "../src/data/profile";
import { projects } from "../src/data/projects";
import { experiences } from "../src/data/experience";
import { achievements, education } from "../src/data/achievements";

config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

async function seed() {
  console.log("Seeding Sanity dataset:", dataset);

  await client.createOrReplace({
    _id: "profile",
    _type: "profile",
    ...profile,
  });
  console.log("✓ profile");

  for (const project of projects) {
    const { slug, comparisons, ...rest } = project;
    await client.createOrReplace({
      _id: `project-${slug}`,
      _type: "project",
      slug: { _type: "slug", current: slug },
      comparisons,
      ...rest,
    });
    console.log(`✓ project: ${slug}`);
  }

  for (const [i, exp] of experiences.entries()) {
    await client.createOrReplace({
      _id: `experience-${exp.id}`,
      _type: "experience",
      sortOrder: i,
      ...exp,
    });
    console.log(`✓ experience: ${exp.id}`);
  }

  for (const [i, item] of achievements.entries()) {
    await client.createOrReplace({
      _id: `achievement-${item.id}`,
      _type: "achievement",
      sortOrder: i,
      ...item,
    });
    console.log(`✓ achievement: ${item.id}`);
  }

  for (const [i, item] of education.entries()) {
    await client.createOrReplace({
      _id: `education-${item.id}`,
      _type: "education",
      sortOrder: i,
      ...item,
    });
    console.log(`✓ education: ${item.id}`);
  }

  console.log("\nDone. Open http://localhost:3001/studio to edit content.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
