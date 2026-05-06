"use client";

import { useRef } from "react";
import { profile } from "@/data/profile";

function MagneticButton({
  children,
  href,
  className,
  external,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  external?: boolean;
}) {
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.3;
    const dy = (e.clientY - cy) * 0.3;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleMouseLeave = () => {
    const btn = btnRef.current;
    if (!btn) return;
    btn.style.transform = "translate(0, 0)";
  };

  return (
    <a
      ref={btnRef}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magnetic-btn inline-flex items-center gap-3 transition-transform duration-300 ease-out ${className ?? ""}`}
    >
      {children}
    </a>
  );
}

export function ConnectSection() {
  return (
    <section id="connect" className="py-32 px-6 bg-surface/30">
      <div className="max-w-[1200px] mx-auto">
        <div className="section-label mb-4">Get in Touch</div>

        {/* Big CTA headline */}
        <div className="mb-16">
          <h2
            className="font-display text-primary leading-[0.9] mb-6"
            style={{ fontSize: "clamp(3rem, 8vw, 8rem)", letterSpacing: "-0.04em" }}
          >
            Let&apos;s build
            <br />
            <span
              className="italic"
              style={{
                WebkitTextStroke: "1px rgba(240,236,228,0.4)",
                color: "transparent",
              }}
            >
              something.
            </span>
          </h2>
          <p className="text-secondary font-light max-w-md text-base leading-relaxed">
            Whether you&apos;re looking for a Technical Program Manager, want to collaborate on a 
            project, or just want to talk tech — reach out.
          </p>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border mb-16">
          {[
            {
              category: "Profile",
              links: [
                { label: "LinkedIn", href: profile.social.linkedin, external: true },
                { label: "GitHub", href: profile.social.github, external: true },
                { label: "Email", href: `mailto:${profile.email}`, external: false },
              ],
            },
            {
              category: "Projects",
              links: [
                { label: "CJI — Conversational Jira Intelligence", href: "/projects/cji", external: false },
                { label: "Velox — Dashboard", href: "/projects/velox", external: false },
              ],
            },
            {
              category: "Quick Hire",
              links: [
                { label: "Download Resume", href: "#", external: false },
                { label: "Schedule a Call", href: `mailto:${profile.email}`, external: false },
              ],
            },
          ].map((group, i) => (
            <div
              key={group.category}
              className="p-8 border-b md:border-b-0 md:border-r border-border last:border-r-0"
            >
              <div className="section-label mb-6">{group.category}</div>
              <div className="space-y-4">
                {group.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="flex items-center justify-between group text-secondary hover:text-primary transition-colors duration-200 text-sm font-light"
                  >
                    <span>{link.label}</span>
                    <span className="text-muted group-hover:text-accent transition-colors duration-200 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Magnetic email CTA */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <MagneticButton
            href={`mailto:${profile.email}`}
            className="group bg-accent text-bg px-10 py-5 font-mono text-sm font-medium tracking-wider uppercase hover:bg-accent-dim"
          >
            Send a Message
            <span className="group-hover:translate-x-1 transition-transform duration-200">↗</span>
          </MagneticButton>

          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs text-muted tracking-wider">
              Available for new opportunities
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
