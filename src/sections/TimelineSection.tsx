import { ScrollReveal } from "../components/ScrollReveal"
import { timeline } from "../lib/data"

export default function TimelineSection() {
  return (
    <section id="timeline" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal className="mb-16 text-center">
          <div className="mb-4 inline-flex rounded-full bg-brand-500/10 px-4 py-1.5 text-xs font-semibold text-brand-400 uppercase tracking-wider font-display">Feuille de Route</div>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            De Rhamna au <span className="gradient-text">Maroc Entier</span>
          </h2>
        </ScrollReveal>

        <div className="relative">
          <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-brand-500 via-brand-400 to-brand-300 hidden md:block" />
          <div className="space-y-8">
            {timeline.map((item, i) => (
              <ScrollReveal key={item.period} delay={i * 80}>
                <div className="flex gap-6">
                  <div className="hidden md:flex relative z-10 mt-0.5 h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-600 text-white text-xs font-bold shadow-lg shadow-brand-500/25 font-display">
                    {i + 1}
                  </div>
                  <div className="flex-1 rounded-2xl border border-border/40 bg-surface-elevated p-5">
                    <div className="text-xs font-bold text-brand-400 font-display mb-1">{item.period}</div>
                    <h3 className="font-semibold font-display mb-1">{item.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
