import { ScrollReveal } from "../components/ScrollReveal"
import { team, nextHires, advisors } from "../lib/data"

export default function TeamSection() {
  return (
    <section id="team" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="mb-16 text-center">
          <div className="mb-4 inline-flex rounded-full bg-brand-500/10 px-4 py-1.5 text-xs font-semibold text-brand-400 uppercase tracking-wider font-display">Fondateur</div>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            Un Ingenieur Logiciel{" "}
            <span className="gradient-text">Dans l'Agriculture</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            L'hydrogel existe deja. Le vrai defi, c'est la distribution, la confiance des agriculteurs, et le suivi des resultats. C'est un probleme de systeme — et les ingenieurs resolvent les problemes de systeme.
          </p>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3 mb-14">
          <ScrollReveal className="md:col-start-2">
            <div className="rounded-3xl border border-brand-500/20 bg-surface-elevated p-8 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white text-2xl font-bold font-display shadow-lg shadow-brand-500/25">
                {team[0].initials}
              </div>
              <h3 className="font-semibold font-display text-lg">{team[0].name}</h3>
              <p className="text-sm text-brand-400 font-medium mb-3">{team[0].role}</p>
              <p className="text-sm text-text-secondary leading-relaxed">{team[0].bio}</p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="rounded-3xl border border-border/40 bg-surface-elevated p-8 text-center mb-8">
            <h3 className="text-sm font-semibold text-text-tertiary uppercase tracking-wider mb-6 font-display">Prochains Recrutements (Post-Financement)</h3>
            <div className="flex flex-wrap justify-center gap-8">
              {nextHires.map((h) => (
                <div key={h.role}>
                  <div className="font-semibold font-display">{h.role}</div>
                  <div className="text-xs text-text-secondary">{h.why}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="rounded-3xl border border-border/40 bg-surface-elevated p-8 text-center">
            <h3 className="text-sm font-semibold text-text-tertiary uppercase tracking-wider mb-6 font-display">Conseil Scientifique</h3>
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
