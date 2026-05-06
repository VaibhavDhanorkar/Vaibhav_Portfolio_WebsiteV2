import { education } from "@/data/achievements";

export function EducationSection() {
  return (
    <section id="education" className="py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="section-label mb-4">Academic Background</div>
        <h2
          className="section-title text-primary font-display mb-16"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          Education
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu, i) => (
            <div
              key={edu.id}
              className="group relative border border-border hover:border-accent/40 bg-white p-10 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
            >
              {/* Degree index */}
              <div className="absolute top-6 right-8 font-display text-7xl text-surface select-none pointer-events-none transition-colors duration-300 group-hover:text-accent-light">
                0{i + 1}
              </div>

              <div className="text-5xl mb-6">{edu.icon}</div>

              <div className="mb-1">
                <span className="font-mono text-[0.6rem] text-accent tracking-widest uppercase">
                  {edu.type === "masters" ? "Graduate" : "Undergraduate"}
                </span>
              </div>

              <h3 className="font-display text-3xl text-primary leading-tight mb-1">
                {edu.degree}
              </h3>
              <p className="font-display text-xl text-secondary italic mb-2">{edu.field}</p>
              <p className="font-mono text-xs text-muted mb-6">{edu.institution}</p>

              <div className="glow-line mb-6" />

              <p className="text-sm text-secondary font-light leading-relaxed">{edu.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
