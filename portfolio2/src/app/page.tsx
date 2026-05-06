import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ConnectSection } from "@/components/sections/ConnectSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <AchievementsSection />
      <ConnectSection />
    </>
  );
}
