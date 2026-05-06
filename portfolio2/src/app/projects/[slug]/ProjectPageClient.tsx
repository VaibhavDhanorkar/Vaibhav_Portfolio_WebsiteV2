"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Project } from "@/data/projects";

export function ProjectPageClient({ project }: { project: Project }) {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-32">
      {/* Back link */}
      <div className="max-w-[1200px] mx-auto px-6 mb-12">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-accent tracking-wider uppercase transition-colors duration-200"
        >
          ← Back to Projects
        </Link>
      </div>

      {/* Hero */}
      <div className="max-w-[1200px] mx-auto px-6 mb-24">
        <div className="flex items-start gap-6 mb-8">
          <span className="text-6xl md:text-7xl">{project.icon}</span>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2 py-1 bg-accent/10 border border-accent/30 text-accent font-mono text-[0.6rem] tracking-widest uppercase">
                {project.status}
              </span>
              <span className="font-mono text-xs text-muted">{project.year}</span>
            </div>
            <h1
              className={`font-display text-primary leading-[0.9] mb-2 transition-all duration-1000 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)", letterSpacing: "-0.04em" }}
            >
              {project.title}
            </h1>
            <p className="font-mono text-secondary text-sm">{project.subtitle}</p>
          </div>
        </div>

        <div className="glow-line" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-16">
          {/* The Why */}
          <div>
            <div className="section-label mb-4">Why This Exists</div>
            <blockquote className="font-display text-2xl md:text-3xl text-primary leading-[1.3] mb-6 border-l-4 border-accent pl-6 italic">
              &ldquo;{project.purpose}&rdquo;
            </blockquote>
          </div>

          {/* Problem */}
          <div>
            <div className="section-label mb-4">The Problem</div>
            <div className="border border-border p-6 md:p-8 bg-surface">
              <div className="flex items-start gap-4">
                <span className="text-red-400/70 text-2xl shrink-0">⚠</span>
                <p className="text-secondary font-light leading-relaxed">{project.problem}</p>
              </div>
            </div>
          </div>

          {/* Solution */}
          <div>
            <div className="section-label mb-4">The Solution</div>
            <div className="border border-accent/30 p-6 md:p-8 bg-accent/[0.03]">
              <div className="flex items-start gap-4">
                <span className="text-accent text-2xl shrink-0">⚡</span>
                <p className="text-primary font-light leading-relaxed">{project.solution}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="section-label mb-4">Overview</div>
            <p className="text-secondary font-light leading-relaxed text-lg">{project.description}</p>
          </div>

          {/* Impact */}
          <div>
            <div className="section-label mb-6">Impact</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.impact.map((item, i) => (
                <div
                  key={i}
                  className="border border-border p-5 bg-surface group hover:border-accent/40 transition-colors duration-200"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-accent text-lg shrink-0">✓</span>
                    <span className="text-primary text-sm font-light">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech stack marquee */}
          <div>
            <div className="section-label mb-6">Technology Stack</div>
            <div className="overflow-hidden border-t border-b border-border py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex gap-8" style={{ animation: "marquee 15s linear infinite", width: "max-content" }}>
                {[...project.techStack, ...project.techStack].map((tech, i) => (
                  <div key={i} className="flex items-center gap-3 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="font-mono text-sm text-secondary hover:text-primary transition-colors duration-200 whitespace-nowrap">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {project.techStack.map((tech) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Sticky CTA */}
          <div className="sticky top-24 space-y-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-accent text-bg px-6 py-4 font-mono text-sm font-medium tracking-wider uppercase hover:bg-accent-dim transition-colors duration-200 animate-glow-pulse"
              >
                Live Demo ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 border border-border-light text-secondary px-6 py-4 font-mono text-sm tracking-wider uppercase hover:border-accent hover:text-accent transition-all duration-200"
              >
                Source Code ↗
              </a>
            )}

            <div className="border border-border p-5 bg-surface space-y-3">
              <div className="section-label mb-3">Details</div>
              {[
                { label: "Year", value: String(project.year) },
                { label: "Status", value: project.status },
                { label: "Category", value: project.tags.join(", ") },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between">
                  <span className="font-mono text-[0.65rem] text-muted tracking-wider uppercase">
                    {row.label}
                  </span>
                  <span className="text-xs text-primary font-light">{row.value}</span>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="border border-border p-5 bg-surface">
              <div className="section-label mb-3">Tags</div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Back CTA */}
            <Link
              href="/#projects"
              className="block text-center font-mono text-xs text-muted hover:text-accent tracking-wider uppercase transition-colors duration-200 py-2"
            >
              ← All Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
