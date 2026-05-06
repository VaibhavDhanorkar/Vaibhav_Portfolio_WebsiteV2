"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; life: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    const spawnParticle = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      particles.push({
        x: mx + (Math.random() - 0.5) * 60,
        y: my + (Math.random() - 0.5) * 60,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5 - 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.15,
        life: 1,
      });
    };

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (frame % 3 === 0) spawnParticle();
      frame++;

      particles = particles.filter((p) => p.life > 0.01);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life *= 0.96;
        p.opacity = p.life * 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(26, 107, 60, ${p.opacity})`;
        ctx.fill();
      }

      // Grid dots - light version
      const spacing = 60;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          const dist = Math.hypot(x - mx, y - my);
          const influence = Math.max(0, 1 - dist / 300);
          const size = 0.8 + influence * 2;
          const opacity = 0.06 + influence * 0.2;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(26, 107, 60, ${opacity})`;
          ctx.fill();
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const handleScrollDown = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Radial gradient - light version */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 60%, rgba(26,107,60,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
        {/* Tag line */}
        <div
          className={`flex items-center gap-3 mb-10 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <span className="section-label">Portfolio</span>
          <span className="glow-line flex-1 max-w-[80px]" />
          <span className="font-mono text-[0.6rem] text-muted tracking-widest">v2.0</span>
        </div>

        {/* Name - first line */}
        <div className="overflow-hidden mb-2">
          <h1
            className={`font-display text-primary transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
            }`}
            style={{
              fontSize: "clamp(4.5rem, 13vw, 14rem)",
              lineHeight: "0.87",
              letterSpacing: "-0.04em",
              transitionDelay: "200ms",
            }}
          >
            Vaibhav
          </h1>
        </div>

        {/* Name - second line, outline style */}
        <div className="overflow-hidden mb-8">
          <h1
            className={`font-display italic transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
            }`}
            style={{
              fontSize: "clamp(4.5rem, 13vw, 14rem)",
              lineHeight: "0.87",
              letterSpacing: "-0.04em",
              transitionDelay: "350ms",
              WebkitTextStroke: "1.5px rgba(26,23,20,0.25)",
              color: "transparent",
            }}
          >
            Dhanorkar
          </h1>
        </div>

        {/* Tagline + stats */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-8 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "550ms" }}
        >
          <div className="max-w-md">
            <p className="text-secondary text-base md:text-lg leading-relaxed font-sans font-light">
              {profile.bio}
            </p>
          </div>

          <div className="flex gap-8 md:gap-12 shrink-0">
            {profile.stats.map((stat, i) => (
              <div key={i} className="text-center md:text-right">
                <div className="font-display text-3xl md:text-4xl text-accent leading-none mb-1">
                  {stat.value}
                </div>
                <div className="font-mono text-[0.6rem] text-muted tracking-widest uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA row */}
        <div
          className={`flex flex-wrap items-center gap-4 mt-12 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "700ms" }}
        >
          <button
            onClick={handleScrollDown}
            className="magnetic-btn group flex items-center gap-3 bg-accent text-white px-8 py-4 font-mono text-sm font-medium tracking-wider uppercase hover:bg-accent-dim transition-colors duration-200"
          >
            View Projects
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </button>

          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-4 border border-border text-secondary text-sm font-mono tracking-wider uppercase hover:border-accent hover:text-accent transition-all duration-200"
          >
            LinkedIn ↗
          </a>
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-4 border border-border text-secondary text-sm font-mono tracking-wider uppercase hover:border-accent hover:text-accent transition-all duration-200"
          >
            GitHub ↗
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "1000ms" }}
      >
        <span className="font-mono text-[0.6rem] text-muted tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-10 overflow-hidden bg-border">
          <div
            className="w-full bg-accent"
            style={{ height: "100%", animation: "scrollLine 2s ease-in-out infinite" }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}
