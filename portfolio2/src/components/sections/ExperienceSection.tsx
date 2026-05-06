"use client";

import { useState } from "react";
import { experiences } from "@/data/experience";

export function ExperienceSection() {
  const [activeId, setActiveId] = useState("charter");
  const active = experiences.find(e => e.id === activeId) || experiences[0];

  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="section-label mb-4">Career Path</div>
        <h2 className="font-display text-ink leading-[1.05] mb-16" style={{ fontSize:"clamp(2.5rem,5vw,4rem)", fontWeight:300 }}>
          Experience
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 border border-border shadow-sm">

          {/* Timeline column */}
          <div className="lg:col-span-2 border-b lg:border-b-0 lg:border-r border-border bg-ivory-dark/30">
            {experiences.map((exp, i) => (
              <button
                key={exp.id}
                onClick={() => setActiveId(exp.id)}
                className={`w-full text-left p-6 border-b border-border last:border-b-0 transition-all duration-200 group ${activeId === exp.id ? "bg-gold-pale/30" : "hover:bg-ivory-dark"}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center pt-1.5 shrink-0">
                    <div className={`w-2 h-2 rounded-full transition-colors duration-200 ${exp.current ? "bg-gold animate-pulse" : activeId === exp.id ? "bg-gold" : "bg-border"}`} />
                    {i < experiences.length-1 && <div className="w-px flex-1 bg-border mt-2 min-h-[24px]" />}
                  </div>
                  <div>
                    <div className="font-mono text-[0.6rem] text-ink-faint tracking-wider mb-1">{exp.period}</div>
                    <div className={`font-display text-lg leading-tight mb-0.5 transition-colors duration-200 ${activeId === exp.id ? "text-ink" : "text-ink-soft group-hover:text-ink"}`} style={{ fontWeight:400 }}>
                      {exp.company}
                    </div>
                    <div className="text-xs text-ink-muted font-light">{exp.role}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-3 p-8 md:p-10 bg-ivory">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  {active.current && (
                    <span className="px-2 py-0.5 bg-gold-pale border border-gold/30 text-gold font-mono text-[0.6rem] tracking-widest uppercase">
                      Present
                    </span>
                  )}
                  <span className="font-mono text-xs text-ink-faint">{active.period}</span>
                </div>
                <h3 className="font-display text-3xl text-ink mb-1" style={{ fontWeight:400 }}>{active.role}</h3>
                <p className="text-ink-soft text-sm font-light">{active.company} · {active.location}</p>
              </div>
              <div className="w-11 h-11 border border-border flex items-center justify-center font-display text-xl text-ink bg-ivory-dark shrink-0">
                {active.logoInitial}
              </div>
            </div>

            <div className="gold-line mb-6" />

            <p className="text-ink-soft text-sm leading-relaxed font-light mb-8">{active.description}</p>

            <div className="space-y-3">
              {active.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-gold text-xs mt-0.5 shrink-0">◆</span>
                  <span className="text-sm text-ink font-light">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="mt-16 overflow-hidden">
          <div className="section-label mb-6 text-center text-ink-muted">Companies I&apos;ve Worked With</div>
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="marquee-track">
              {["Charter Communications","Capgemini","Cognizant","Syntel","Tech Mahindra",
                "Charter Communications","Capgemini","Cognizant","Syntel","Tech Mahindra"].map((c, i) => (
                <span key={i} className="font-display text-2xl text-ink-faint hover:text-ink-soft transition-colors shrink-0" style={{ fontWeight:300 }}>
                  {c}<span className="text-gold ml-6 mr-3">·</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
