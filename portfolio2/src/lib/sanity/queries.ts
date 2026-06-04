import type {
  Achievement,
  Education,
  Experience,
  Profile,
  Project,
  SiteContent,
} from "@/types/content";
import { profile as seedProfile } from "@/data/profile";
import { projects as seedProjects } from "@/data/projects";
import { experiences as seedExperiences } from "@/data/experience";
import { achievements as seedAchievements, education as seedEducation } from "@/data/achievements";
import { getSanityClient, REVALIDATE_SECONDS } from "./client";

export { REVALIDATE_SECONDS };

const profileQuery = `*[_type == "profile"][0]{
  name, firstName, lastName, headline, bio, location, email,
  stats[]{ value, label },
  social{ linkedin, github }
}`;

const projectsQuery = `*[_type == "project"] | order(year desc){
  "slug": slug.current,
  title, subtitle, status, category, icon, description, purpose,
  problem, solution, impact, tags, techStack, githubUrl, liveUrl,
  featured, year,
  comparisons[]{ category, problem, solution }
}`;

const experiencesQuery = `*[_type == "experience"] | order(sortOrder asc){
  id, role, company, location, period, current, description,
  highlights, logoInitial
}`;

const achievementsQuery = `*[_type == "achievement"] | order(sortOrder asc){
  id, icon, title, org, detail, year, type
}`;

const educationQuery = `*[_type == "education"] | order(sortOrder asc){
  id, icon, degree, field, institution, detail, type
}`;

function warnFallback(label: string, reason?: string) {
  const detail = reason ? ` (${reason})` : "";
  console.warn(`[sanity] Using seed ${label}${detail}. Add content at /studio or run npm run seed:sanity`);
}

async function fetchWithFallback<T>(
  label: string,
  query: string,
  fallback: T,
  isEmpty: (data: T) => boolean
): Promise<T> {
  try {
    const data = await getSanityClient().fetch<T>(query, {}, { next: { revalidate: REVALIDATE_SECONDS } });
    if (isEmpty(data)) {
      warnFallback(label, "empty CMS response");
      return fallback;
    }
    return data;
  } catch (err) {
    const message = err instanceof Error ? err.message : "fetch failed";
    warnFallback(label, message);
    return fallback;
  }
}

export async function getProfile(): Promise<Profile> {
  return fetchWithFallback("profile", profileQuery, seedProfile, (d) => !d?.name);
}

export async function getProjects(): Promise<Project[]> {
  return fetchWithFallback("projects", projectsQuery, seedProjects, (d) => !d?.length);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

export async function getExperiences(): Promise<Experience[]> {
  return fetchWithFallback("experiences", experiencesQuery, seedExperiences, (d) => !d?.length);
}

export async function getAchievements(): Promise<Achievement[]> {
  return fetchWithFallback("achievements", achievementsQuery, seedAchievements, (d) => !d?.length);
}

export async function getEducation(): Promise<Education[]> {
  return fetchWithFallback("education", educationQuery, seedEducation, (d) => !d?.length);
}

export async function getSiteContent(): Promise<SiteContent> {
  const [profile, projects, experiences, achievements, education] = await Promise.all([
    getProfile(),
    getProjects(),
    getExperiences(),
    getAchievements(),
    getEducation(),
  ]);
  return { profile, projects, experiences, achievements, education };
}

export function getAllTags(projects: Project[]): string[] {
  return Array.from(new Set(projects.flatMap((p) => p.tags)));
}
