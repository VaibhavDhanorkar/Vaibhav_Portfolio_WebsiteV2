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
};

export const projects: Project[] = [
  {
    slug: "cji",
    title: "CJI",
    subtitle: "Conversational Jira Intelligence",
    status: "V1 Live",
    category: "Professional",
    icon: "🧠",
    description:
      "A full-stack web application that transforms Jira project data into an interactive, conversational intelligence platform. Ask questions in plain English, get instant answers backed by SQL, ML-powered intent classification, and a 4-agent pipeline — all in under 7ms.",
    purpose:
      "Jira holds the truth about software delivery — but it speaks in filters, JQL, and pivot tables. Engineers and managers spend hours extracting insights that should be instant. I built CJI because project intelligence should feel like a conversation, not a spreadsheet exercise.",
    problem:
      "Teams waste hours weekly on manual Jira reporting. Stakeholders need answers that take analysts hours to produce. The data exists — the interface to access it naturally doesn't.",
    solution:
      "A 4-agent AI pipeline that classifies intent across 36+ query types, generates optimized SQL on the fly, and returns conversational answers in under 7ms. No JQL. No exports. No waiting.",
    impact: [
      "Under 7ms average response time",
      "36+ supported query intents",
      "Eliminates hours of manual reporting weekly",
      "Natural language interface for non-technical stakeholders",
    ],
    tags: ["AI", "Productivity", "Full-Stack"],
    techStack: ["Python", "FastAPI", "HTMX", "ML/NLP", "SQLite", "Chart.js", "Docker"],
    featured: true,
    year: 2025,
  },
  {
    slug: "velox",
    title: "Velox",
    subtitle: "Private Intelligence Layer for Solana Trading",
    status: "V1 Active",
    category: "Personal",
    icon: "⚡",
    description:
      "A self-hosted, invite-only signal platform that identifies high-conviction trading opportunities on Solana by tracking coordinated wallet behavior — the kind of edge that no public platform exposes.",
    purpose:
      "Public trading platforms are noise factories. They surface what everyone already sees. Real edge comes from watching what coordinated smart money does before the crowd notices. Velox is the platform I wished existed — private, precise, and actionable.",
    problem:
      "Public signal platforms aggregate broad feeds that everyone already monitors. By the time signals are public, the opportunity has passed. Smart money moves quietly.",
    solution:
      "A self-hosted WebSocket pipeline that monitors coordinated wallet clusters on Solana in real-time. Signals are pre-interpreted and delivered directly via Telegram — no dashboards to monitor, no noise to filter.",
    impact: [
      "Real-time on-chain wallet cluster tracking",
      "Zero-UI signal delivery via Telegram",
      "Invite-only access preserves signal integrity",
      "Pre-interpreted signals — actionable on receipt",
    ],
    tags: ["Blockchain", "AI", "Finance"],
    techStack: ["Python", "Solana", "WebSocket", "Telegram", "Private Dashboard"],
    featured: true,
    year: 2026,
  },
];

export const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));
