import { ScrollReveal } from "../components/ScrollReveal"
import { AnimatedCounter } from "../components/AnimatedCounter"
import { problemStats } from "../lib/data"

export default function ProblemSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="mb-16 text-center">
          <div className="mb-4 inline-flex rounded-full bg-red-500/10 px-4 py-1.5 text-xs font-semibold text-red-400 uppercase tracking-wider font-display">Le Problème</div>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            La Pénurie d'Eau{" "}
            <span className="gradient-text-warm">S'Accélère</span> à Rhamna
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            L'agriculture de Rhamna est la plus vulnérable du Maroc face au stress hydrique. Le changement climatique aggrave la situation.
          </p>
        </ScrollReveal>
        <div className="grid gap-6 md:grid-cols-3">
          {problemStats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 100}>
              <div className="rounded-3xl border border-border/40 bg-surface-elevated p-8 text-center h-full flex flex-col justify-center">
                <div className="text-5xl font-extrabold gradient-text-warm font-display mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
