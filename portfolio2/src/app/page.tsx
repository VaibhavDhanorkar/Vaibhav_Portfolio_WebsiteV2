import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ConnectSection } from "@/components/sections/ConnectSection";
import { getSiteContent, getAllTags } from "@/lib/sanity/queries";

export default async function Home() {
  const { profile, projects, experiences, achievements, education } = await getSiteContent();
  const allTags = getAllTags(projects);

  return (
    <>
      <HeroSection profile={profile} />
      <ProjectsSection projects={projects} allTags={allTags} />
      <ExperienceSection experiences={experiences} />
      <AchievementsSection achievements={achievements} />
      <EducationSection education={education} />
      <ConnectSection profile={profile} projects={projects} />
    </>
  );
}
