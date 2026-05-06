"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { projects, allTags } from "@/data/projects";

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--gx", `${x}%`);
    card.style.setProperty("--gy", `${y}%`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative border border-border hover:border-accent/40 bg-white transition-all duration-500 overflow-hidden shadow-sm hover:shadow-md"
      style={{ "--gx": "50%", "--gy": "50%" } as React.CSSProperties}
    >
      {/* Spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(circle at var(--gx) var(--gy), rgba(26,107,60,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="p-8 md:p-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{project.icon}</span>
            <div>
              <div className="font-mono text-[0.6rem] text-accent tracking-widest uppercase mb-1">
                {project.status}
              </div>
              <h3 className="font-display text-3xl md:text-4xl text-primary leading-none">
                {project.title}
              </h3>
            </div>
          </div>
          <span className="font-mono text-xs text-muted">{project.year}</span>
        </div>

        <p className="text-sm font-mono text-secondary mb-4">{project.subtitle}</p>

        <p className="text-secondary text-sm leading-relaxed mb-8 font-light">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.techStack.map((tech) => (
            <span key={tech} className="tag">{tech}</span>
          ))}
        </div>

        {/* Impact highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {project.impact.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-accent mt-0.5 text-xs">✓</span>
              <span className="text-xs text-secondary font-light">{item}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Link
            href={`/projects/${project.slug}`}
            className="group/link inline-flex items-center gap-2 font-mono text-xs text-accent tracking-wider uppercase hover:gap-3 transition-all duration-200"
          >
            Explore Project
            <span className="group-hover/link:translate-x-1 transition-transform duration-200">→</span>
          </Link>

          <div className="flex gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 text-[0.6rem] font-mono tracking-wide border border-border text-muted">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const filtered = activeTag ? projects.filter((p) => p.tags.includes(activeTag)) : projects;

  return (
    <section id="projects" className="py-32 px-6 bg-surface/50">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="section-label mb-4">What I Build</div>
            <h2
              className="section-title text-primary font-display"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Personal Projects
            </h2>
            <p className="text-secondary italic font-display mt-2 text-lg">
              &ldquo;Built, not just planned.&rdquo;
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setActiveTag(null)} className={`tag ${activeTag === null ? "active" : ""}`}>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
