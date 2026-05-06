"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Project } from "@/data/projects";

const comparisonRows: Record<string, { category:string; problem:string; solution:string }[]> = {
  cji: [
    { category:"Jira Reporting",   problem:"Hours of manual filtering, exporting, and pivot tables", solution:"Ask in plain English. Get answers in under 7ms." },
    { category:"Data Dashboards",  problem:"Static reports that require manual queries and refreshes", solution:"Conversational AI with 36+ intents and real-time intelligence." },
  ],
  velox: [
    { category:"Trading Signals",  problem:"Public platforms surface noise from aggregated feeds", solution:"Proprietary on-chain analysis. Pre-interpreted. Actionable." },
    { category:"Signal Delivery",  problem:"Requires constant monitoring and manual interpretation", solution:"Zero UI needed. Signals arrive ready to act on, 24/7." },
  ],
};

export function ProjectPageClient({ project }: { project: Project }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const rows = comparisonRows[project.slug] ?? [];

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-32">

      {/* ── Back ──────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-6 mb-14">
        <Link href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-xs text-ink-muted hover:text-gold tracking-widest uppercase transition-colors duration-200">
          ← Back to Portfolio
        </Link>
      </div>

      {/* ── Hero ──────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-6 mb-24">
        <div className="flex items-start gap-6 mb-8">
          <span className="text-6xl md:text-7xl">{project.icon}</span>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2 py-1 bg-gold-pale border border-gold/25 text-gold font-mono text-[0.6rem] tracking-widest uppercase">
                {project.status}
              </span>
              <span className="px-2 py-1 bg-ivory-dark border border-border text-ink-muted font-mono text-[0.6rem] tracking-widest uppercase">
                {project.category}
              </span>
              <span className="font-mono text-xs text-ink-faint">{project.year}</span>
            </div>
            <h1
              className={`font-display text-ink leading-[0.88] mb-2 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ fontSize:"clamp(3.5rem,9vw,9rem)", letterSpacing:"-0.035em", fontWeight:300 }}
            >
              {project.title}
            </h1>
            <p className="font-mono text-sm text-ink-muted">{project.subtitle}</p>
          </div>
        </div>
        <div className="gold-line" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">

        {/* ── Main content ──────────────────────────── */}
        <div className="lg:col-span-2 space-y-20">

          {/* Why */}
          <div>
            <div className="section-label mb-5">Why This Exists</div>
            <blockquote className="font-display text-2xl md:text-3xl text-ink leading-[1.35] border-l-[3px] border-gold pl-7 italic"
              style={{ fontWeight:300 }}>
              &ldquo;{project.purpose}&rdquo;
            </blockquote>
          </div>

          {/* Problem */}
          <div>
            <div className="section-label mb-4">The Problem</div>
            <div className="border border-border p-7 bg-ivory-dark/50">
              <div className="flex items-start gap-4">
                <span className="text-red-400/60 text-2xl shrink-0">⚠</span>
                <p className="text-ink-soft font-light leading-relaxed">{project.problem}</p>
              </div>
            </div>
          </div>

          {/* Solution */}
          <div>
            <div className="section-label mb-4">The Solution</div>
            <div className="border border-gold/30 p-7 bg-gold-pale/20">
              <div className="flex items-start gap-4">
                <span className="text-gold text-2xl shrink-0">⚡</span>
                <p className="text-ink font-light leading-relaxed">{project.solution}</p>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div>
            <div className="section-label mb-4">Overview</div>
            <p className="text-ink-soft font-light leading-relaxed text-lg">{project.description}</p>
          </div>

          {/* Impact */}
          <div>
            <div className="section-label mb-6">Impact</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.impact.map((item, i) => (
                <div key={i} className="card p-5 group">
                  <div className="flex items-start gap-3">
                    <span className="text-gold text-base shrink-0">✓</span>
                    <span className="text-ink text-sm font-light">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Gap comparison */}
          {rows.length > 0 && (
            <div>
              <div className="section-label mb-4">Market Gap</div>
              <h3 className="font-display text-xl text-ink mb-6" style={{ fontWeight:400 }}>
                What exists vs. what I built.
              </h3>
              <div className="border border-border overflow-hidden">
                {rows.map((row, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-3 border-b border-border last:border-b-0">
                    <div className="p-5 border-b md:border-b-0 md:border-r border-border bg-ivory-dark/40">
                      <span className="font-mono text-xs text-gold tracking-wider">{row.category}</span>
                    </div>
                    <div className="p-5 border-b md:border-b-0 md:border-r border-border">
                      <div className="flex items-start gap-2.5">
                        <span className="text-red-400/60 text-xs mt-0.5 shrink-0">✕</span>
                        <span className="text-sm text-ink-muted font-light">{row.problem}</span>
                      </div>
                    </div>
                    <div className="p-5 bg-gold-pale/20">
                      <div className="flex items-start gap-2.5">
                        <span className="text-gold text-xs mt-0.5 shrink-0">✓</span>
                        <span className="text-sm text-ink font-light">{row.solution}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech stack */}
          <div>
            <div className="section-label mb-6">Technology Stack</div>
            <div className="overflow-hidden border-t border-b border-border py-6 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
              <div className="flex gap-10" style={{ animation:"marquee 15s linear infinite", width:"max-content" }}>
                {[...project.techStack,...project.techStack].map((t, i) => (
                  <div key={i} className="flex items-center gap-3 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span className="font-mono text-sm text-ink-muted hover:text-ink transition-colors whitespace-nowrap">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {project.techStack.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>

        </div>

        {/* ── Sidebar ───────────────────────────────── */}
        <div>
          <div className="sticky top-28 space-y-4">

            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-ink text-ivory px-6 py-4 font-sans text-sm font-medium tracking-wider uppercase hover:bg-ink-mid transition-colors duration-200">
                Live Demo ↗
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 border border-border text-ink-soft px-6 py-4 font-sans text-sm tracking-wider uppercase hover:border-gold hover:text-gold transition-all duration-200">
                Source Code ↗
              </a>
            )}

            {/* Meta card */}
            <div className="border border-border p-6 bg-ivory-dark/40 space-y-3.5">
              <div className="section-label mb-4">Details</div>
              {[
                { label:"Year",     value:String(project.year) },
                { label:"Status",   value:project.status       },
                { label:"Category", value:project.category     },
                { label:"Tags",     value:project.tags.join(", ") },
              ].map(r => (
                <div key={r.label} className="flex items-start justify-between gap-3">
                  <span className="font-mono text-[0.62rem] text-ink-faint tracking-wider uppercase shrink-0">{r.label}</span>
                  <span className="text-xs text-ink font-light text-right">{r.value}</span>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="border border-border p-6 bg-ivory">
              <div className="section-label mb-4">Tags</div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>

            {/* Back */}
            <Link href="/#projects"
              className="block text-center font-mono text-xs text-ink-faint hover:text-gold tracking-wider uppercase transition-colors duration-200 py-2">
              ← All Projects
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
