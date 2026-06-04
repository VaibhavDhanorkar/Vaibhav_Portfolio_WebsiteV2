"use client";

import { useEffect, useRef, useState } from "react";
import type { Profile } from "@/types/content";

export function HeroSection({ profile }: { profile: Profile }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    type Particle = { x: number; y: number; vx: number; vy: number; size: number; life: number };
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    let frame = 0;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      if (frame % 4 === 0) {
        particles.push({
          x: mouseRef.current.x + (Math.random() - 0.5) * 50,
          y: mouseRef.current.y + (Math.random() - 0.5) * 50,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4 - 0.25,
          size: Math.random() * 1.8 + 0.4,
          life: 1,
        });
      }

      particles = particles.filter((p) => p.life > 0.02);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life *= 0.95;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(184,146,42,${p.life * 0.45})`;
        ctx.fill();
      }

      const { x: mx, y: my } = mouseRef.current;
      const gap = 64;
      for (let gx = 0; gx < canvas.width + gap; gx += gap) {
        for (let gy = 0; gy < canvas.height + gap; gy += gap) {
          const d = Math.hypot(gx - mx, gy - my);
          const inf = Math.max(0, 1 - d / 280);
          ctx.beginPath();
          ctx.arc(gx, gy, 0.75 + inf * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(184,146,42,${0.07 + inf * 0.28})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const nameSize = "clamp(3.875rem, 10.75vw, 11.5rem)";

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 55%, rgba(184,146,42,0.04) 0%, transparent 75%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
        <div
          className={`flex items-center gap-4 mb-8 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "80ms" }}
        >
          <div className="gold-line w-12" />
          <span className="section-label">{profile.headline}</span>
          <div className="gold-line flex-1 max-w-[60px]" />
        </div>

        <div className="overflow-hidden mb-1">
          <h1
            className={`font-display text-ink leading-[0.87] transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"}`}
            style={{
              fontSize: nameSize,
              letterSpacing: "-0.035em",
              transitionDelay: "200ms",
              fontWeight: 300,
            }}
          >
            {profile.firstName}
          </h1>
        </div>
        <div className="overflow-hidden mb-10">
          <h1
            className={`font-display italic leading-[0.87] transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"}`}
            style={{
              fontSize: nameSize,
              letterSpacing: "-0.035em",
              transitionDelay: "340ms",
              fontWeight: 300,
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(28,22,8,0.28)",
            }}
          >
            {profile.lastName}
          </h1>
        </div>

        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-10 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "520ms" }}
        >
          <p className="text-ink-soft text-base md:text-lg leading-relaxed font-light max-w-md font-sans">
            {profile.bio}
          </p>

          <div className="flex gap-10 shrink-0">
            {profile.stats.map((s, i) => (
              <div key={i} className="text-right">
                <div
                  className="font-display text-3xl md:text-4xl text-gold leading-none mb-1"
                  style={{ fontWeight: 400 }}
                >
                  {s.value}
                </div>
                <div className="section-label-sm text-ink-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`flex flex-wrap items-center gap-4 mt-12 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "680ms" }}
        >
          <button
            onClick={() => scrollTo("projects")}
            className="magnetic-btn group flex items-center gap-3 bg-ink text-ivory px-8 py-4 font-sans text-sm font-medium tracking-wider uppercase hover:bg-ink-mid transition-colors duration-300"
          >
            View Portfolio
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </button>

          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-4 border border-border text-ink-soft text-sm font-sans tracking-wider uppercase hover:border-gold hover:text-gold transition-all duration-200"
          >
            LinkedIn ↗
          </a>
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-4 border border-border text-ink-soft text-sm font-sans tracking-wider uppercase hover:border-gold hover:text-gold transition-all duration-200"
          >
            GitHub ↗
          </a>
        </div>
      </div>

      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDelay: "1100ms" }}
      >
        <span className="section-label text-ink-faint">Scroll</span>
        <div className="w-px h-10 overflow-hidden bg-border">
          <div className="w-full h-full bg-gold" style={{ animation: "scrollTick 2s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
}
