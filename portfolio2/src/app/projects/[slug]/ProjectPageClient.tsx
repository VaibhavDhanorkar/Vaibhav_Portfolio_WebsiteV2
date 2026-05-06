"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Project } from "@/data/projects";

const comparisonRows: Record<string, { category: string; problem: string; solution: string }[]> = {
  cji: [
    {
      category: "Jira Reporting",
      problem: "Hours of manual filtering, exporting, and pivot tables",
      solution: "Ask in plain English. Get answers in under 7ms.",
    },
    {
      category: "Data Dashboards",
      problem: "Static reports that require manual queries and refreshes",
      solution: "Conversational AI with 36+ intents and real-time intelligence.",
    },
  ],
  velox: [
    {
      category: "Trading Signals",
      problem: "Public platforms surface noise from aggregated feeds",
      solution: "Proprietary on-chain analysis. Pre-interpreted. Actionable.",
    },
    {
      category: "Signal Delivery",
      problem: "Requires constant monitoring and manual interpretation",
      solution: "Zero UI needed. Signals arrive ready to act on, 24/7.",
    },
  ],
};

export function ProjectPageClient({ project }: { project: Project }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const rows = comparisonRows[project.slug] ?? [];

  return (
    <div className="min-h-screen bg-bg pt-24 pb-32">
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
              <span className="px-2 py-1 bg-accent-light border border-accent/20 text-accent font-mono text-[0.6rem] tracking-widest uppercase">
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
            <div className="border border-border p-6 md:p-8 bg-surface rounded-sm">
              <div className="flex items-start gap-4">
                <span className="text-red-500/60 text-2xl shrink-0">⚠</span>
                <p className="text-secondary font-light leading-relaxed">{project.problem}</p>
              </div>
            </div>
          </div>

          {/* Solution */}
          <div>
            <div className="section-label mb-4">The Solution</div>
            <div className="border border-accent/25 p-6 md:p-8 bg-accent-light rounded-sm">
              <div className="flex items-start gap-4">
                <span className="text-accent text-2xl shrink-0">⚡</span>
                <p className="text-primary font-light leading-relaxed">{project.solution}</p>
              </div>
            </div>
          </div>

          {/* Overview */}
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
                  className="border border-border p-5 bg-white group hover:border-accent/40 hover:bg-accent-light/30 transition-colors duration-200"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-accent text-lg shrink-0">✓</span>
                    <span className="text-primary text-sm font-light">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why These Exist — comparison table (moved from homepage) */}
          {rows.length > 0 && (
            <div>
              <div className="section-label mb-4">Market Gap</div>
              <h3 className="font-display text-xl text-primary mb-6">
                What exists vs. what I built.
              </h3>
              <div className="border border-border overflow-hidden">
                {rows.map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-3 border-b border-border last:border-b-0"
                  >
                    <div className="p-5 border-b md:border-b-0 md:border-r border-border bg-surface">
                      <span className="font-mono text-xs text-accent tracking-wider">{row.category}</span>
                    </div>
                    <div className="p-5 border-b md:border-b-0 md:border-r border-border">
                      <div className="flex items-start gap-3">
                        <span className="text-red-500/60 text-xs mt-0.5 shrink-0">✕</span>
                        <span className="text-sm text-muted font-light">{row.problem}</span>
                      </div>
                    </div>
                    <div className="p-5 bg-accent-light/40">
                      <div className="flex items-start gap-3">
                        <span className="text-accent text-xs mt-0.5 shrink-0">✓</span>
                        <span className="text-sm text-primary font-light">{row.solution}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech stack marquee */}
          <div>
            <div className="section-label mb-6">Technology Stack</div>
            <div className="overflow-hidden border-t border-b border-border py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div
                className="flex gap-8"
                style={{ animation: "marquee 15s linear infinite", width: "max-content" }}
              >
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
                <span key={tech} className="tag">{tech}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="sticky top-24 space-y-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-accent text-white px-6 py-4 font-mono text-sm font-medium tracking-wider uppercase hover:bg-accent-dim transition-colors duration-200"
              >
                Live Demo ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 border border-border text-secondary px-6 py-4 font-mono text-sm tracking-wider uppercase hover:border-accent hover:text-accent transition-all duration-200"
              >
                Source Code ↗
              </a>
            )}

            <div className="border border-border p-5 bg-white space-y-3">
              <div className="section-label mb-3">Details</div>
              {[
                { label: "Year", value: String(project.year) },
                { label: "Status", value: project.status },
                { label: "Category", value: project.tags.join(", ") },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between">
                  <span className="font-mono text-[0.65rem] text-muted tracking-wider uppercase">{row.label}</span>
                  <span className="text-xs text-primary font-light">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="border border-border p-5 bg-white">
              <div className="section-label mb-3">Tags</div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>

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
