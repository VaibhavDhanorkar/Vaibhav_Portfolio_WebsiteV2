import type { Profile } from "@/types/content";

export function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="border-t border-border py-12 px-6 bg-ivory-dark/30">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span className="font-display text-xl text-ink" style={{ fontWeight: 400 }}>
            VD<span className="text-gold">.</span>
          </span>
          <span className="text-ink-faint text-xs font-mono">|</span>
          <span className="text-ink-muted text-xs font-mono">
            © {new Date().getFullYear()} {profile.name}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-soft hover:text-gold text-nav font-mono uppercase transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            LinkedIn ↗
          </a>
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-soft hover:text-gold text-nav font-mono uppercase transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
