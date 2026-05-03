import { ScrollReveal } from "../components/ScrollReveal"
import { whyRhamnaCards } from "../lib/data"

export default function WhyRhamnaSection() {
  return (
    <section id="why-rhamna" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="mb-16 text-center">
          <div className="mb-4 inline-flex rounded-full bg-brand-500/10 px-4 py-1.5 text-xs font-semibold text-brand-400 uppercase tracking-wider font-display">Pourquoi Rhamna</div>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            Une Région <span className="gradient-text">Stratégique</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            Rhamna n'est pas un hasard — c'est l'épicentre du stress hydrique agricole marocain, et le lieu idéal pour prouver notre technologie.
          </p>
        </ScrollReveal>
        <div className="grid gap-6 md:grid-cols-4">
          {whyRhamnaCards.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 80}>
              <div className="rounded-3xl border border-border/40 bg-surface-elevated p-6 h-full">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">{card.icon}</div>
                <h3 className="font-semibold font-display mb-2">{card.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{card.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
