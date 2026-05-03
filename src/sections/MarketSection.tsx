import { ScrollReveal } from "../components/ScrollReveal"
import { AnimatedCounter } from "../components/AnimatedCounter"
import { marketData } from "../lib/data"

export default function MarketSection() {
  return (
    <section id="market" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="mb-16 text-center">
          <div className="mb-4 inline-flex rounded-full bg-accent-500/10 px-4 py-1.5 text-xs font-semibold text-accent-400 uppercase tracking-wider font-display">Opportunité Marché</div>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            Un Marché{" "}
            <span className="gradient-text-warm">Massif</span> et en Croissance
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            Le marché marocain des polymères agricoles est en pleine expansion, porté par la stratégie Génération Green et la raréfaction de l'eau.
          </p>
        </ScrollReveal>
        <div className="grid gap-6 md:grid-cols-3">
          {marketData.map((item, i) => (
            <ScrollReveal key={item.label} delay={i * 120}>
              <div className="rounded-3xl border border-border/40 bg-surface-elevated p-8 text-center">
                <div className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-4 font-display">{item.label}</div>
                <div className="text-5xl font-extrabold gradient-text font-display mb-2">
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                </div>
                <div className="text-sm font-medium text-brand-400 font-display">{item.growth}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
