import { ScrollReveal } from "../components/ScrollReveal"
import { team, advisors } from "../lib/data"

export default function TeamSection() {
  return (
    <section id="team" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="mb-16 text-center">
          <div className="mb-4 inline-flex rounded-full bg-brand-500/10 px-4 py-1.5 text-xs font-semibold text-brand-400 uppercase tracking-wider font-display">Équipe</div>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            Construit par des{" "}
            <span className="gradient-text">Experts Marocains</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            Une équipe fondatrice ancrée dans l'écosystème agricole et scientifique marocain.
          </p>
        </ScrollReveal>
        <div className="grid gap-6 md:grid-cols-4 mb-14">
          {team.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 80}>
              <div className="rounded-3xl border border-border/40 bg-surface-elevated p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white text-xl font-bold font-display shadow-lg shadow-brand-500/20">
                  {member.initials}
                </div>
                <h3 className="font-semibold font-display">{member.name}</h3>
                <p className="text-xs text-brand-400 font-medium mb-3">{member.role}</p>
                <p className="text-xs text-text-secondary leading-relaxed">{member.bio}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <div className="rounded-3xl border border-border/40 bg-surface-elevated p-8 text-center">
            <h3 className="text-sm font-semibold text-text-tertiary uppercase tracking-wider mb-6 font-display">Conseil Consultatif</h3>
            <div className="flex flex-wrap justify-center gap-8">
              {advisors.map((a) => (
                <div key={a.name}>
                  <div className="font-semibold font-display">{a.name}</div>
                  <div className="text-xs text-text-tertiary">{a.role}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
