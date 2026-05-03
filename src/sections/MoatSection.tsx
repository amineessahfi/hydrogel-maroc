import { ScrollReveal } from "../components/ScrollReveal"
import { moatItems } from "../lib/data"

export default function MoatSection() {
  return (
    <ScrollReveal className="mx-auto max-w-7xl px-6 pb-24">
      <div className="rounded-3xl border border-brand-500/10 bg-gradient-to-br from-surface-elevated to-surface-card p-8 md:p-12">
        <div className="grid gap-8 md:grid-cols-3">
          {moatItems.map((item) => (
            <div key={item.title}>
              <div className="text-brand-400 mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2 font-display">{item.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  )
}
