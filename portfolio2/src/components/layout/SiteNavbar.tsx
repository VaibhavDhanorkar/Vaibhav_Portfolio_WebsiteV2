"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const navItems = [
  { href: "#projects", label: "Portfolio" },
  { href: "#experience", label: "Experience" },
  { href: "#achievements", label: "Achievements" },
  { href: "#education", label: "Education" },
  { href: "#connect", label: "Connect" },
];

const navLinkClass = (active: boolean) =>
  `font-mono text-nav uppercase tracking-wider py-2 px-1 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
    active ? "text-gold" : "text-ink-soft hover:text-ink"
  }`;

const hireMeClass =
  "inline-flex items-center justify-center px-5 py-2.5 border border-border text-ink text-sm font-sans font-medium tracking-wider uppercase hover:border-gold hover:text-gold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

export function Navbar({ email }: { email: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = ["projects", "experience", "achievements", "education", "connect"];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const handleNav = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scrollTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen ? "glass py-3" : "py-5 bg-transparent"
      }`}
    >
      <nav className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          onClick={scrollTop}
          className="font-display text-lg text-ink hover:text-gold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          style={{ fontWeight: 400 }}
        >
          VD<span className="text-gold">.</span>
        </Link>

        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map(({ href, label }) => {
            const id = href.replace("#", "");
            const active = activeSection === id;
            return (
              <li key={href}>
                <a href={href} onClick={(e) => handleNav(e, href)} className={navLinkClass(active)}>
                  {label}
                  {active && (
                    <span className="ml-2 inline-block w-1 h-1 rounded-full bg-gold align-middle" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <a href={`mailto:${email}`} className={`hidden md:inline-flex ${hireMeClass}`}>
            Hire Me
          </a>

          <button
            type="button"
            className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5 border border-border hover:border-gold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={`block w-5 h-px bg-ink transition-all duration-300 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-ink transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-ink transition-all duration-300 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <>
          <button
            type="button"
            className="md:hidden fixed inset-0 top-[57px] bg-ink/20 z-40"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <div
            id="mobile-nav"
            className="md:hidden fixed left-0 right-0 top-[57px] z-50 glass border-t border-border-soft px-6 py-8"
          >
            <ul className="flex flex-col gap-1">
              {navItems.map(({ href, label }) => {
                const id = href.replace("#", "");
                const active = activeSection === id;
                return (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={(e) => handleNav(e, href)}
                      className={`block ${navLinkClass(active)}`}
                    >
                      {label}
                      {active && (
                        <span className="ml-2 inline-block w-1 h-1 rounded-full bg-gold align-middle" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
            <a
              href={`mailto:${email}`}
              className={`mt-8 w-full ${hireMeClass}`}
              onClick={() => setMenuOpen(false)}
            >
              Hire Me
            </a>
          </div>
        </>
      )}
    </header>
  );
}
