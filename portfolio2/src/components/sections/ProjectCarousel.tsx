"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/types/content";

function CarouselCard({
  project,
  isActive,
}: {
  project: Project;
  isActive: boolean;
}) {
  const purposeLine = project.purpose.split(".")[0] + ".";

  return (
    <article
      className={`carousel-slide card flex flex-col h-full ${isActive ? "carousel-slide-active" : ""}`}
      aria-current={isActive ? "true" : undefined}
    >
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-3xl shrink-0">{project.icon}</span>
            <div className="min-w-0">
              <span className="section-label-sm mb-1 block">{project.status}</span>
              <h3 className="font-display text-2xl text-ink leading-tight truncate" style={{ fontWeight: 400 }}>
                {project.title}
              </h3>
            </div>
          </div>
          <span
            className={`shrink-0 px-2 py-0.5 font-mono text-[0.6rem] tracking-widest uppercase border ${
              project.category === "Professional"
                ? "bg-gold-pale border-gold/30 text-gold"
                : "bg-ivory-dark border-border text-ink-muted"
            }`}
          >
            {project.category}
          </span>
        </div>

        <p className="font-mono text-xs text-ink-muted mb-3 tracking-wide line-clamp-1">{project.subtitle}</p>

        <blockquote
          className="border-l-2 border-gold/40 pl-3 mb-4 italic text-ink-soft text-sm leading-relaxed font-display line-clamp-2"
          style={{ fontWeight: 300 }}
        >
          &ldquo;{purposeLine}&rdquo;
        </blockquote>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.slice(0, 3).map((t) => (
            <span key={t} className="tag text-[0.65rem]">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-border">
          <Link
            href={`/projects/${project.slug}`}
            className={`inline-flex items-center gap-2 font-mono text-nav tracking-wider uppercase transition-all duration-200 ${
              isActive
                ? "text-gold hover:gap-3"
                : "text-ink-faint hover:text-ink-soft"
            }`}
          >
            Explore Project
            <span className={isActive ? "translate-x-0.5" : ""}>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track || projects.length === 0) return;

    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;

    slideRefs.current.forEach((slide, i) => {
      if (!slide) return;
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const dist = Math.abs(slideCenter - trackCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });

    setActiveIndex(closest);
  }, [projects.length]);

  useEffect(() => {
    setActiveIndex(0);
    trackRef.current?.scrollTo({ left: 0 });
  }, [projects]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateActiveIndex();
    track.addEventListener("scroll", updateActiveIndex, { passive: true });
    window.addEventListener("resize", updateActiveIndex);

    return () => {
      track.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, [updateActiveIndex, projects]);

  const scrollToIndex = (index: number) => {
    const slide = slideRefs.current[index];
    slide?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const activeIndexRef = useRef(0);
  activeIndexRef.current = activeIndex;

  const goPrev = () => scrollToIndex(Math.max(0, activeIndexRef.current - 1));
  const goNext = () => scrollToIndex(Math.min(projects.length - 1, activeIndexRef.current + 1));

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [projects.length]);

  if (projects.length === 0) {
    return (
      <p className="text-center text-ink-muted font-light py-16">No projects match this filter.</p>
    );
  }

  return (
    <div className="relative" tabIndex={0} role="region" aria-label="Project carousel">
      {projects.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            disabled={activeIndex === 0}
            aria-label="Previous project"
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center border border-border bg-ivory/90 hover:border-gold hover:text-gold transition-colors disabled:opacity-30 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            ←
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={activeIndex === projects.length - 1}
            aria-label="Next project"
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center border border-border bg-ivory/90 hover:border-gold hover:text-gold transition-colors disabled:opacity-30 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            →
          </button>
        </>
      )}

      <div ref={trackRef} className="carousel-track">
        {projects.map((project, i) => (
          <div
            key={project.slug}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
          >
            <CarouselCard project={project} isActive={activeIndex === i} />
          </div>
        ))}
      </div>

      {projects.length > 1 && (
        <div className="flex justify-center gap-2 mt-6" aria-hidden>
          {projects.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to project ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                activeIndex === i ? "bg-gold" : "bg-border"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
