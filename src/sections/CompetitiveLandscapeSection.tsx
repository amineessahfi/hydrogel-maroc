import { Check, X } from "lucide-react"
import { ScrollReveal } from "../components/ScrollReveal"
import { competitors } from "../lib/data"

export default function CompetitiveLandscapeSection() {
  return (
    <section id="competitors" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal className="mb-16 text-center">
          <div className="mb-4 inline-flex rounded-full bg-accent-500/10 px-4 py-1.5 text-xs font-semibold text-accent-400 uppercase tracking-wider font-display">Paysage Concurrentiel</div>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            Pourquoi Nous <span className="gradient-text-warm">Gagnons</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            Le marché marocain dépend aujourd'hui d'importations coûteuses. HydroGel change la donne avec une production locale.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="rounded-3xl border border-border/40 bg-surface-elevated overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40">
                    <th className="text-left px-6 py-4 font-semibold text-text font-display">Produit</th>
                    <th className="text-center px-4 py-4 font-semibold text-text font-display">Prix</th>
                    <th className="text-center px-4 py-4 font-semibold text-text font-display">Absorption</th>
                    <th className="text-center px-4 py-4 font-semibold text-text font-display">Durée de vie</th>
                    <th className="text-center px-4 py-4 font-semibold text-text font-display">Production locale</th>
                    <th className="text-center px-4 py-4 font-semibold text-text font-display">Brevets</th>
                  </tr>
                </thead>
                <tbody>
                  {competitors.map((c, i) => (
                    <tr key={c.name} className={`border-b border-border/20 ${i === 0 ? "bg-brand-500/5" : ""}`}>
                      <td className={`px-6 py-4 ${i === 0 ? "font-semibold text-brand-400 font-display" : "text-text"}`}>{c.name}</td>
                      <td className="text-center px-4 py-4 text-text-secondary">{c.price}</td>
                      <td className={`text-center px-4 py-4 ${i === 0 ? "text-brand-400 font-semibold" : "text-text-secondary"}`}>{c.absorption}</td>
                      <td className={`text-center px-4 py-4 ${i === 0 ? "text-brand-400 font-semibold" : "text-text-secondary"}`}>{c.lifespan}</td>
                      <td className="text-center px-4 py-4">{c.local ? <Check className="h-5 w-5 text-brand-400 mx-auto" /> : <X className="h-5 w-5 text-text-tertiary mx-auto" />}</td>
                      <td className="text-center px-4 py-4">{c.ip ? <Check className="h-5 w-5 text-brand-400 mx-auto" /> : <X className="h-5 w-5 text-text-tertiary mx-auto" />}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
