export type ProjectComparison = {
  category: string;
  problem: string;
  solution: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  status: string;
  category: "Professional" | "Personal";
  description: string;
  purpose: string;
  icon: string;
  tags: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  year: number;
  problem: string;
  solution: string;
  impact: string[];
  comparisons?: ProjectComparison[];
};

export type ProfileStat = {
  value: string;
  label: string;
};

export type Profile = {
  name: string;
  firstName: string;
  lastName: string;
  headline: string;
  bio: string;
  location: string;
  email: string;
  stats: ProfileStat[];
  social: {
    linkedin: string;
    github: string;
  };
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  description: string;
  highlights: string[];
  logoInitial: string;
};

export type Achievement = {
  id: string;
  icon: string;
  title: string;
  org: string;
  detail: string;
  year?: string;
  type: "award" | "certification" | "membership";
};

export type Education = {
  id: string;
  icon: string;
  degree: string;
  field: string;
  institution: string;
  detail: string;
  type: "masters" | "bachelors" | "certification";
};

export type SiteContent = {
  profile: Profile;
  projects: Project[];
  experiences: Experience[];
  achievements: Achievement[];
  education: Education[];
};
