"use client";

import { useState } from "react";
import type { Project } from "@/types/content";
import { ProjectCarousel } from "./ProjectCarousel";

export function ProjectsSection({ projects, allTags }: { projects: Project[]; allTags: string[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag ? projects.filter((p) => p.tags.includes(activeTag)) : projects;
  const sorted = [...filtered].sort((a, b) => {
    if (a.category !== b.category) {
      return a.category === "Professional" ? -1 : 1;
    }
    return b.year - a.year;
  });

  return (
    <section id="projects" className="py-32 px-6 bg-ivory-dark/40">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="section-label mb-4">What I Build</div>
            <h2
              className="font-display text-ink leading-[1.05]"
              style={{ fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 300 }}
            >
              Portfolio
            </h2>
            <p className="font-display italic text-ink-soft mt-2 text-lg" style={{ fontWeight: 300 }}>
              &ldquo;Built, not just planned.&rdquo;
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`tag ${activeTag === null ? "active" : ""}`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                className={`tag ${activeTag === tag ? "active" : ""}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <ProjectCarousel projects={sorted} />
      </div>
    </section>
  );
}
