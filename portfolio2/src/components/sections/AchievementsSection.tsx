import type { Achievement } from "@/types/content";

export function AchievementsSection({ achievements }: { achievements: Achievement[] }) {
  return (
    <section id="achievements" className="py-32 px-6 bg-ivory-dark/40">
      <div className="max-w-[1200px] mx-auto">
        <div className="section-label mb-4">Recognition</div>
        <h2 className="font-display text-ink leading-[1.05] mb-16" style={{ fontSize:"clamp(2.5rem,5vw,4rem)", fontWeight:300 }}>
          Achievements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {achievements.map(a => (
            <div key={a.id} className="card group relative overflow-hidden p-8">
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-pale/50" style={{ clipPath:"polygon(100% 0, 0 0, 100% 100%)" }} />
              </div>

              <div className="text-4xl mb-5">{a.icon}</div>
              {a.year && <div className="section-label mb-2">{a.year}</div>}
              <h3 className="font-display text-xl text-ink mb-1 leading-tight" style={{ fontWeight:400 }}>{a.title}</h3>
              <p className="font-mono text-xs text-ink-muted mb-4">{a.org}</p>
              <p className="text-sm text-ink-soft font-light leading-relaxed">{a.detail}</p>
              <div className="mt-6"><span className="tag">{a.type}</span></div>
            </div>
          ))}
        </div>

        {/* IEEE highlight banner */}
        <div className="border border-gold/30 bg-gold-pale/20 p-10 relative overflow-hidden">
          <div className="absolute right-0 inset-y-0 w-2/5 pointer-events-none"
            style={{ background:"radial-gradient(ellipse at right center, rgba(184,146,42,0.09) 0%, transparent 70%)" }} />
          <div className="flex flex-col md:flex-row md:items-center gap-6 relative">
            <div className="text-5xl shrink-0">🏅</div>
            <div>
              <div className="section-label mb-2">Flagship Recognition</div>
              <h3 className="font-display text-3xl text-ink mb-2" style={{ fontWeight:400 }}>IEEE Senior Member</h3>
              <p className="text-ink-soft text-sm font-light max-w-lg leading-relaxed">
                Elected to IEEE Senior Member grade — a distinction held by less than 8% of the global
                membership of the world&apos;s largest technical professional organization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
