"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { projects, allTags, type Project } from "@/data/projects";

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--gy", `${((e.clientY - r.top)  / r.height)* 100}%`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      className="card group relative overflow-hidden"
      style={{ "--gx":"50%","--gy":"50%" } as React.CSSProperties}
    >
      {/* Spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background:"radial-gradient(circle at var(--gx) var(--gy), rgba(184,146,42,0.07) 0%, transparent 58%)" }}
      />

      <div className="p-8 md:p-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{project.icon}</span>
            <div>
              <div className="section-label mb-1">{project.status}</div>
              <h3 className="font-display text-3xl md:text-4xl text-ink leading-none" style={{ fontWeight:400 }}>
                {project.title}
              </h3>
            </div>
          </div>
          <span className="font-mono text-xs text-ink-faint">{project.year}</span>
        </div>

        <p className="font-mono text-xs text-ink-muted mb-4 tracking-wide">{project.subtitle}</p>

        {/* Purpose pull-quote */}
        <blockquote className="border-l-2 border-gold/40 pl-4 mb-6 italic text-ink-soft text-sm leading-relaxed font-display" style={{ fontWeight:300 }}>
          &ldquo;{project.purpose.split(".")[0]}.&rdquo;
        </blockquote>

        <p className="text-ink-soft text-sm leading-relaxed mb-8 font-light">
          {project.description}
        </p>

        {/* Tech */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.techStack.map(t => <span key={t} className="tag">{t}</span>)}
        </div>

        {/* Impact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
          {project.impact.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-gold mt-0.5 text-xs shrink-0">✓</span>
              <span className="text-xs text-ink-soft font-light">{item}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 border-t border-border">
          <Link
            href={`/projects/${project.slug}`}
            className="group/link inline-flex items-center gap-2 font-mono text-xs text-gold tracking-wider uppercase hover:gap-3 transition-all duration-200"
          >
            Explore Project
            <span className="group-hover/link:translate-x-1 transition-transform duration-200">→</span>
          </Link>
          <div className="flex gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="px-2 py-1 text-[0.6rem] font-mono border border-border-soft text-ink-faint tracking-wide">
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

  const filtered = activeTag ? projects.filter(p => p.tags.includes(activeTag)) : projects;
  const professional = filtered.filter(p => p.category === "Professional");
  const personal     = filtered.filter(p => p.category === "Personal");

  return (
    <section id="projects" className="py-32 px-6 bg-ivory-dark/40">
      <div className="max-w-[1200px] mx-auto">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <div className="section-label mb-4">What I Build</div>
            <h2 className="font-display text-ink leading-[1.05]" style={{ fontSize:"clamp(2.5rem,5vw,4rem)", fontWeight:300 }}>
              Portfolio
            </h2>
            <p className="font-display italic text-ink-soft mt-2 text-lg" style={{ fontWeight:300 }}>
              &ldquo;Built, not just planned.&rdquo;
            </p>
          </div>

          {/* Tag filters */}
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setActiveTag(null)} className={`tag ${activeTag === null ? "active" : ""}`}>All</button>
            {allTags.map(tag => (
              <button key={tag} onClick={() => setActiveTag(tag === activeTag ? null : tag)} className={`tag ${activeTag === tag ? "active" : ""}`}>
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* ── Professional Projects ── */}
        {professional.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="gold-line w-8" />
              <span className="section-label">Professional Projects</span>
              <div className="gold-line flex-1" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {professional.map(p => <ProjectCard key={p.slug} project={p} />)}
            </div>
          </div>
        )}

        {/* ── Personal Projects ── */}
        {personal.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="gold-line w-8" />
              <span className="section-label">Personal Projects</span>
              <div className="gold-line flex-1" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {personal.map(p => <ProjectCard key={p.slug} project={p} />)}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
