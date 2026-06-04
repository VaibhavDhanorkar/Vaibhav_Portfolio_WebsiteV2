"use client";

import { useRef } from "react";
import type { Profile, Project } from "@/types/content";

function MagneticBtn({ children, href, className, external }: {
  children: React.ReactNode; href: string; className?: string; external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX-(r.left+r.width/2))*0.28}px,${(e.clientY-(r.top+r.height/2))*0.28}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };

  return (
    <a ref={ref} href={href} target={external?"_blank":undefined} rel={external?"noopener noreferrer":undefined}
      onMouseMove={onMove} onMouseLeave={onLeave}
      className={`magnetic-btn inline-flex items-center gap-3 ${className??""}`}>
      {children}
    </a>
  );
}

export function ConnectSection({ profile, projects }: { profile: Profile; projects: Project[] }) {
  return (
    <section id="connect" className="py-32 px-6 bg-ivory-dark/40">
      <div className="max-w-[1200px] mx-auto">
        <div className="section-label mb-4">Get in Touch</div>

        <div className="mb-16">
          <h2 className="font-display text-ink leading-[0.88] mb-6"
            style={{ fontSize:"clamp(3rem,8vw,8rem)", letterSpacing:"-0.035em", fontWeight:300 }}>
            Let&apos;s build
            <br />
            <span className="italic" style={{ color:"transparent", WebkitTextStroke:"1.5px rgba(28,22,8,0.28)" }}>
              something.
            </span>
          </h2>
          <p className="text-ink-soft font-light max-w-md text-base leading-relaxed">
            Whether you&apos;re looking for a Technical Program Manager, want to collaborate on a project,
            or just want to talk tech — reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-border shadow-sm mb-14">
          {[
            { category:"Profile", links:[
              { label:"LinkedIn", href:profile.social.linkedin, ext:true },
              { label:"GitHub",   href:profile.social.github,   ext:true },
              { label:"Email",    href:`mailto:${profile.email}`, ext:false },
            ]},
            { category:"Projects", links: projects.map((p) => ({
              label: `${p.title} — ${p.subtitle}`,
              href: `/projects/${p.slug}`,
              ext: false,
            }))},
            { category:"Quick Hire", links:[
              { label:"Download Resume",  href:"/resume.pdf", ext:false },
              { label:"Schedule a Call",  href:`mailto:${profile.email}`, ext:false },
            ]},
          ].map(g => (
            <div key={g.category} className="p-8 border-b md:border-b-0 md:border-r border-border last:border-r-0 bg-ivory">
              <div className="section-label-sm mb-6">{g.category}</div>
              <div className="space-y-4">
                {g.links.map(l => (
                  <a key={l.label} href={l.href} target={l.ext?"_blank":undefined} rel={l.ext?"noopener noreferrer":undefined}
                    className="flex items-center justify-between group text-ink-soft hover:text-ink transition-colors duration-200 text-sm font-light">
                    <span>{l.label}</span>
                    <span className="text-ink-faint group-hover:text-gold group-hover:translate-x-1 transition-all duration-200">→</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <MagneticBtn href={`mailto:${profile.email}`}
            className="group bg-ink text-ivory px-10 py-5 font-sans text-sm font-medium tracking-wider uppercase hover:bg-ink-mid">
            Send a Message
            <span className="group-hover:translate-x-1 transition-transform duration-200">↗</span>
          </MagneticBtn>

          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="font-mono text-xs text-ink-muted tracking-wider">Available for new opportunities</span>
          </div>
        </div>
      </div>
    </section>
  );
}
