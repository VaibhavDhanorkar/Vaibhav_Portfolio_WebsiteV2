import { achievements } from "@/data/achievements";

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="section-label mb-4">Recognition</div>
        <h2
          className="section-title text-primary font-display mb-16"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          Achievements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((a, i) => (
            <div
              key={a.id}
              className="group relative border border-border hover:border-accent/40 bg-surface p-8 transition-all duration-300 overflow-hidden"
            >
              {/* Accent corner */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className="absolute top-0 right-0 w-32 h-32 bg-accent/10"
                  style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                />
              </div>

              <div className="text-4xl mb-4">{a.icon}</div>

              {a.year && (
                <div className="font-mono text-[0.6rem] text-accent tracking-widest uppercase mb-2">
                  {a.year}
                </div>
              )}

              <h3 className="font-display text-xl text-primary mb-1 leading-tight">{a.title}</h3>
              <p className="text-xs text-secondary font-mono mb-4">{a.org}</p>
              <p className="text-sm text-muted font-light leading-relaxed">{a.detail}</p>

              {/* Type badge */}
              <div className="mt-6">
                <span className="tag">{a.type}</span>
              </div>
            </div>
          ))}
        </div>

        {/* IEEE highlight */}
        <div className="mt-16 border border-accent/30 bg-accent/[0.03] p-10 relative overflow-hidden">
          <div
            className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at right center, rgba(200,255,0,0.08) 0%, transparent 70%)",
            }}
          />
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="text-5xl shrink-0">🏅</div>
            <div>
              <div className="section-label mb-2">Flagship Recognition</div>
              <h3 className="font-display text-3xl text-primary mb-2">IEEE Senior Member</h3>
              <p className="text-secondary font-light text-sm max-w-lg">
                Elected to IEEE Senior Member grade — a distinction held by less than 8% of the 
                global membership of the world&apos;s largest technical professional organization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
