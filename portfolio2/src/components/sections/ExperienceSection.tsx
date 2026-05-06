"use client";

import { useState } from "react";
import { experiences } from "@/data/experience";

export function ExperienceSection() {
  const [activeId, setActiveId] = useState<string>("charter");
  const active = experiences.find((e) => e.id === activeId) || experiences[0];

  return (
    <section id="experience" className="py-32 px-6 bg-surface/30">
      <div className="max-w-[1200px] mx-auto">
        <div className="section-label mb-4">Career Path</div>
        <h2
          className="section-title text-primary font-display mb-16"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          Experience
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 border border-border">
          {/* Timeline list */}
          <div className="lg:col-span-2 border-b lg:border-b-0 lg:border-r border-border">
            {experiences.map((exp, i) => (
              <button
                key={exp.id}
                onClick={() => setActiveId(exp.id)}
                className={`w-full text-left p-6 border-b border-border last:border-b-0 transition-all duration-200 group ${
                  activeId === exp.id
                    ? "bg-accent/[0.06]"
                    : "hover:bg-surface"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center pt-1.5 shrink-0">
                    <div
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        exp.current
                          ? "bg-accent animate-pulse"
                          : activeId === exp.id
                          ? "bg-accent"
                          : "bg-muted"
                      }`}
                    />
                    {i < experiences.length - 1 && (
                      <div className="w-px flex-1 bg-border mt-2 min-h-[24px]" />
                    )}
                  </div>
                  <div>
                    <div className="font-mono text-[0.6rem] text-muted tracking-wider mb-1">
                      {exp.period}
                    </div>
                    <div
                      className={`font-display text-lg leading-tight mb-0.5 transition-colors duration-200 ${
                        activeId === exp.id ? "text-primary" : "text-secondary group-hover:text-primary"
                      }`}
                    >
                      {exp.company}
                    </div>
                    <div className="text-xs text-muted font-light">{exp.role}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-3 p-8 md:p-10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  {active.current && (
                    <span className="px-2 py-0.5 bg-accent/10 border border-accent/30 text-accent font-mono text-[0.6rem] tracking-widest uppercase">
                      Present
                    </span>
                  )}
                  <span className="font-mono text-xs text-muted">{active.period}</span>
                </div>
                <h3 className="font-display text-3xl text-primary mb-1">{active.role}</h3>
                <p className="text-secondary font-light text-sm">
                  {active.company} · {active.location}
                </p>
              </div>

              <div className="w-12 h-12 border border-border-light flex items-center justify-center font-display text-xl text-primary shrink-0">
                {active.logoInitial}
              </div>
            </div>

            <div className="glow-line mb-6" />

            <p className="text-secondary text-sm leading-relaxed font-light mb-8">
              {active.description}
            </p>

            <div className="space-y-3">
              {active.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-accent text-xs mt-0.5 shrink-0">◆</span>
                  <span className="text-sm text-primary font-light">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company logos marquee */}
        <div className="mt-16 overflow-hidden">
          <div className="section-label mb-6 text-center">Companies I&apos;ve Worked With</div>
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="marquee-track">
              {[
                "Charter Communications",
                "Capgemini",
                "Cognizant",
                "Syntel",
                "Tech Mahindra",
                "Charter Communications",
                "Capgemini",
                "Cognizant",
                "Syntel",
                "Tech Mahindra",
              ].map((company, i) => (
                <span
                  key={i}
                  className="font-display text-2xl text-muted hover:text-secondary transition-colors duration-200 shrink-0"
                >
                  {company}
                  <span className="text-accent ml-6 mr-3">·</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
