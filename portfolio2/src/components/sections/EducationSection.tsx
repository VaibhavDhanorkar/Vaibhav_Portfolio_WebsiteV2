import { education } from "@/data/achievements";

export function EducationSection() {
  return (
    <section id="education" className="py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="section-label mb-4">Academic Background</div>
        <h2 className="font-display text-ink leading-[1.05] mb-16" style={{ fontSize:"clamp(2.5rem,5vw,4rem)", fontWeight:300 }}>
          Education
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu, i) => (
            <div key={edu.id} className="card group relative overflow-hidden p-10">
              {/* Large ghost number */}
              <div className="absolute top-4 right-6 font-display text-8xl text-ivory-deep select-none pointer-events-none transition-colors duration-300 group-hover:text-gold-pale" style={{ fontWeight:300 }}>
                0{i+1}
              </div>

              <div className="text-5xl mb-6">{edu.icon}</div>

              <div className="section-label mb-2">{edu.type === "masters" ? "Graduate" : "Undergraduate"}</div>

              <h3 className="font-display text-4xl text-ink leading-none mb-1" style={{ fontWeight:300 }}>{edu.degree}</h3>
              <p className="font-display text-xl text-ink-soft italic mb-3" style={{ fontWeight:300 }}>{edu.field}</p>
              <p className="font-mono text-xs text-ink-muted mb-7">{edu.institution}</p>

              <div className="gold-line mb-7" />

              <p className="text-sm text-ink-soft font-light leading-relaxed">{edu.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
