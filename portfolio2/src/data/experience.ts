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

export const experiences: Experience[] = [
  {
    id: "charter",
    role: "Technical Program Manager",
    company: "Charter Communications",
    location: "via Kforce · Remote",
    period: "2024 — Present",
    current: true,
    description:
      "Driving cross-functional technology programs across enterprise systems, coordinating delivery across distributed engineering teams in one of the largest US telecom providers.",
    highlights: [
      "Recognized as Consultant of the Quarter Q4 2024 and Q1 2025",
      "Coordinating delivery across distributed engineering teams",
      "Driving enterprise system modernization programs",
    ],
    logoInitial: "C",
  },
  {
    id: "capgemini",
    role: "Senior Technology Manager",
    company: "Capgemini",
    location: "Global",
    period: "2020 — 2024",
    current: false,
    description:
      "Led large-scale technology delivery programs for enterprise clients, managing end-to-end program execution and stakeholder alignment across global teams.",
    highlights: [
      "Led cross-continental delivery teams of 50+ engineers",
      "End-to-end enterprise program management",
      "Client stakeholder alignment at C-level",
    ],
    logoInitial: "C",
  },
  {
    id: "cognizant",
    role: "Technical Program Manager",
    company: "Cognizant",
    location: "US / India",
    period: "2016 — 2020",
    current: false,
    description:
      "Managed complex technology programs with cross-functional teams, driving delivery excellence and process optimization for Fortune 500 clients.",
    highlights: [
      "Managed multi-million dollar technology programs",
      "Implemented Agile transformation for enterprise clients",
      "Drove delivery excellence across cross-functional teams",
    ],
    logoInitial: "C",
  },
  {
    id: "syntel",
    role: "Software Engineer",
    company: "Syntel",
    location: "India",
    period: "2013 — 2016",
    current: false,
    description:
      "Developed and maintained enterprise software solutions, contributing to full lifecycle application development for global clients.",
    highlights: [
      "Full lifecycle enterprise application development",
      "Contributed to production systems for global clients",
    ],
    logoInitial: "S",
  },
  {
    id: "techmahindra",
    role: "Software Engineer",
    company: "Tech Mahindra",
    location: "India",
    period: "2011 — 2013",
    current: false,
    description:
      "Built and supported enterprise applications in the telecom domain, gaining foundational engineering experience in large-scale systems.",
    highlights: [
      "Enterprise application development in telecom",
      "Foundational experience in large-scale systems",
    ],
    logoInitial: "T",
  },
];
