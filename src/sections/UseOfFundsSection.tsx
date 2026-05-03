import { ScrollReveal } from "../components/ScrollReveal"
import { useOfFunds } from "../lib/data"

export default function UseOfFundsSection() {
  return (
    <section id="use-of-funds" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="mb-16 text-center">
          <div className="mb-4 inline-flex rounded-full bg-accent-500/10 px-4 py-1.5 text-xs font-semibold text-accent-400 uppercase tracking-wider font-display">Utilisation des Fonds</div>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            Comment Nous Allouerons{" "}
            <span className="gradient-text-warm">les 8M MAD</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            Chaque dirham est investi pour maximiser l'impact sur le terrain à Rhamna et préparer l'expansion nationale.
          </p>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-4 mb-10">
          {useOfFunds.map((item, i) => (
            <ScrollReveal key={item.label} delay={i * 80}>
              <div className="rounded-3xl border border-border/40 bg-surface-elevated p-6 text-center h-full">
                <div className="text-4xl font-extrabold gradient-text font-display mb-2">{item.pct}%</div>
                <h3 className="font-semibold font-display mb-2">{item.label}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="rounded-3xl border border-border/40 bg-surface-elevated p-6">
            <div className="h-3 rounded-full bg-muted overflow-hidden flex">
              {useOfFunds.map((item, i) => {
                const colors = ["bg-brand-500", "bg-brand-400", "bg-accent-400", "bg-brand-300"]
                return (
                  <div
                    key={item.label}
                    className={`${colors[i]} h-full transition-all duration-1000`}
                    style={{ width: `${item.pct}%` }}
                    title={`${item.label}: ${item.pct}%`}
                  />
                )
              })}
            </div>
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
              {useOfFunds.map((item, i) => {
                const colors = ["bg-brand-500", "bg-brand-400", "bg-accent-400", "bg-brand-300"]
                return (
                  <div key={item.label} className="flex items-center gap-2 text-xs text-text-secondary">
                    <div className={`h-2.5 w-2.5 rounded-sm ${colors[i]}`} />
                    {item.label} ({item.pct}%)
                  </div>
                )
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
