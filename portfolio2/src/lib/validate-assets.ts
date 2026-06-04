import fs from "fs";
import path from "path";

const OPTIONAL_ASSETS = ["og-image.png", "favicon.ico"];
const RECOMMENDED_ASSETS = ["resume.pdf"];

export function validateAssets(options?: { requiredAssets?: string[]; publicDir?: string }) {
  const publicDir = options?.publicDir ?? path.join(process.cwd(), "public");
  const required = options?.requiredAssets ?? [];

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
    console.warn("[validate-assets] Created public/ directory.");
  }

  const missingRequired = required.filter(
    (file) => !fs.existsSync(path.join(publicDir, file))
  );

  if (missingRequired.length > 0) {
    throw new Error(
      `Required public assets missing:\n${missingRequired.map((f) => `  - public/${f}`).join("\n")}`
    );
  }

  for (const file of RECOMMENDED_ASSETS) {
    if (!fs.existsSync(path.join(publicDir, file))) {
      console.warn(`[validate-assets] Recommended asset missing: public/${file}`);
    }
  }

  for (const file of OPTIONAL_ASSETS) {
    if (!fs.existsSync(path.join(publicDir, file))) {
      console.warn(`[validate-assets] Optional asset missing: public/${file}`);
    }
  }
}
