import type { Profile } from "@/types/content";

export function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="border-t border-border py-12 px-6 bg-ivory-dark/30">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span className="font-display text-xl text-ink" style={{ fontWeight:400 }}>
            VD<span className="text-gold">.</span>
          </span>
          <span className="text-ink-faint text-xs font-mono">|</span>
          <span className="text-ink-muted text-xs font-mono">
            © {new Date().getFullYear()} {profile.name}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer"
            className="text-ink-faint hover:text-gold text-xs font-mono tracking-wider uppercase transition-colors duration-200">
            LinkedIn ↗
          </a>
          <a href={profile.social.github} target="_blank" rel="noopener noreferrer"
            className="text-ink-faint hover:text-gold text-xs font-mono tracking-wider uppercase transition-colors duration-200">
            GitHub ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
