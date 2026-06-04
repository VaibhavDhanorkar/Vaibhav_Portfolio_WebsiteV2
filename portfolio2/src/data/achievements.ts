import type { Achievement, Education } from "@/types/content";

export type { Achievement, Education };

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
];

export const education: Education[] = [
  {
    id: "ms",
    icon: "🎓",
    degree: "M.S.",
    field: "IT Project Management",
    institution: "Master of Science",
    detail: "Graduate degree focused on enterprise technology program management and leadership.",
    type: "masters",
  },
  {
    id: "be",
    icon: "🎓",
    degree: "B.E.",
    field: "Computer Science & Engineering",
    institution: "Bachelor of Engineering",
    detail: "Foundational degree in computer science, software engineering, and systems design.",
    type: "bachelors",
  },
];
