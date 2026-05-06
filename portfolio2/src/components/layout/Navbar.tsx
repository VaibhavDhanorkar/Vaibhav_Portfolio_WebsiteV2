"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { href:"#projects",     label:"Portfolio"     },
  { href:"#experience",   label:"Experience"    },
  { href:"#achievements", label:"Achievements"  },
  { href:"#education",    label:"Education"     },
  { href:"#connect",      label:"Connect"       },
];

export function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = ["projects","experience","achievements","education","connect"];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior:"smooth", block:"start" });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass py-3" : "py-5 bg-transparent"}`}>
      <nav className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">

        <Link href="/" onClick={e => { e.preventDefault(); window.scrollTo({ top:0, behavior:"smooth" }); }}
          className="font-display text-lg text-ink hover:text-gold transition-colors duration-200" style={{ fontWeight:400 }}>
          VD<span className="text-gold">.</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navItems.map(({ href, label }) => {
            const id = href.replace("#","");
            const active = activeSection === id;
            return (
              <li key={href}>
                <a href={href} onClick={e => handleNav(e, href)}
                  className={`font-mono text-[0.68rem] tracking-widest uppercase transition-colors duration-200 ${active ? "text-gold" : "text-ink-muted hover:text-ink"}`}>
                  {label}
                  {active && <span className="ml-2 inline-block w-1 h-1 rounded-full bg-gold align-middle" />}
                </a>
              </li>
            );
          })}
        </ul>

        <a href="mailto:vaibhav.dhanorkar@example.com"
          className="hidden md:inline-flex items-center px-4 py-2 border border-border text-ink text-[0.68rem] font-mono tracking-widest uppercase hover:border-gold hover:text-gold transition-all duration-200">
          Hire Me
        </a>
      </nav>
    </header>
  );
}
