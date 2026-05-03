import { useMemo } from "react"
import { ScrollReveal } from "../components/ScrollReveal"
import { financials } from "../lib/data"

export default function FinancialsSection() {
  const maxVal = useMemo(() => Math.max(...financials.map((f) => Math.max(f.revenue, f.costs))), [])

  return (
    <section id="financials" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="mb-16 text-center">
          <div className="mb-4 inline-flex rounded-full bg-brand-500/10 px-4 py-1.5 text-xs font-semibold text-brand-400 uppercase tracking-wider font-display">Prévisions Financières</div>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            Trajectoire vers la{" "}
            <span className="gradient-text">Rentabilité</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            Projections basées sur les pilotes Rhamna. Capacité de production à Benguerir. Chiffres en millions MAD.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="rounded-3xl border border-border/40 bg-surface-elevated p-8 md:p-10">
            {/* Bar chart */}
            <div className="mb-10">
              <div className="flex items-end gap-6 md:gap-10 h-56 md:h-64 justify-center">
                {financials.map((f) => {
                  const revH = (f.revenue / maxVal) * 100
                  const costH = (f.costs / maxVal) * 100
                  const profitable = f.revenue > f.costs
                  return (
                    <div key={f.year} className="flex flex-col items-center gap-2">
                      <div className="flex items-end gap-2 h-44 md:h-48">
                        <div className="relative w-10 md:w-14 flex flex-col justify-end">
                          <div
                            className="w-full rounded-t-lg bg-gradient-to-t from-brand-600 to-brand-400 transition-all duration-700"
                            style={{ height: `${revH}%` }}
                            title={`Revenus: ${f.revenue}M MAD`}
                          />
                        </div>
                        <div className="relative w-10 md:w-14 flex flex-col justify-end">
                          <div
                            className={`w-full rounded-t-lg transition-all duration-700 ${profitable ? "bg-gradient-to-t from-brand-800 to-brand-600/60" : "bg-gradient-to-t from-accent-500/40 to-accent-400/30"}`}
                            style={{ height: `${costH}%` }}
                            title={`Coûts: ${f.costs}M MAD`}
                          />
                        </div>
                      </div>
                      <span className="text-xs font-bold text-text font-display">{f.year}</span>
                    </div>
                  )
                })}
              </div>
              <div className="flex items-center justify-center gap-6 mt-4 text-xs text-text-secondary">
                <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-sm bg-gradient-to-t from-brand-600 to-brand-400" /> Revenus</div>
                <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-sm bg-gradient-to-t from-brand-800 to-brand-600/60" /> Coûts</div>
              </div>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {financials.map((f) => {
                const profitable = f.revenue > f.costs
                const diff = f.revenue - f.costs
                return (
                  <div key={f.year} className="text-center p-4 rounded-xl bg-surface-card">
                    <div className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2 font-display">{f.year}</div>
                    <div className="text-lg font-bold text-text font-display">{f.revenue}M</div>
                    <div className="text-xs text-text-secondary">{f.stage}</div>
                    <div className={`text-xs font-bold mt-2 ${profitable ? "text-brand-400" : "text-accent-400"}`}>
                      {profitable ? `+${diff.toFixed(1)}M` : `${diff.toFixed(1)}M`}
                    </div>
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
