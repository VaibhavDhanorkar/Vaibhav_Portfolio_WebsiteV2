import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-border mt-32 py-12 px-6 bg-white">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span className="font-display text-xl text-primary">
            VD<span className="text-accent">.</span>
          </span>
          <span className="text-muted text-xs font-mono">|</span>
          <span className="text-secondary text-xs font-mono">
            © {new Date().getFullYear()} Vaibhav Dhanorkar
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent text-xs font-mono tracking-wider uppercase transition-colors duration-200"
          >
            LinkedIn ↗
          </a>
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent text-xs font-mono tracking-wider uppercase transition-colors duration-200"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
