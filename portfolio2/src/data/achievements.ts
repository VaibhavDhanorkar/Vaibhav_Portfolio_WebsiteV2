export type Achievement = {
  id: string;
  icon: string;
  title: string;
  org: string;
  detail: string;
  year?: string;
  type: "award" | "certification" | "education" | "membership";
};

export const achievements: Achievement[] = [
  {
    id: "ieee",
    icon: "🏅",
    title: "IEEE Senior Member",
    org: "Institute of Electrical and Electronics Engineers",
    detail: "Elected to Senior Member grade — top 8% of IEEE membership worldwide.",
    type: "membership",
  },
  {
    id: "cotq-2",
    icon: "🏆",
    title: "Consultant of the Quarter",
    org: "Charter Communications via Kforce",
    detail: "Consecutive recognition for exceptional delivery and cross-functional impact.",
    year: "Q1 2025",
    type: "award",
  },
  {
    id: "cotq-1",
    icon: "🏆",
    title: "Consultant of the Quarter",
    org: "Charter Communications via Kforce",
    detail: "Recognized for outstanding program management and stakeholder alignment.",
    year: "Q4 2024",
    type: "award",
  },
  {
    id: "ms",
    icon: "🎓",
    title: "M.S. IT Project Management",
    org: "Master of Science",
    detail: "Graduate degree focused on enterprise technology program management and leadership.",
    type: "education",
  },
  {
    id: "be",
    icon: "🎓",
    title: "B.E. Computer Science & Engineering",
    org: "Bachelor of Engineering",
    detail: "Foundational degree in computer science, software engineering, and systems design.",
    type: "education",
  },
];
