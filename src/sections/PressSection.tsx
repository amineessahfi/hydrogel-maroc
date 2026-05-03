import { ScrollReveal } from "../components/ScrollReveal"
import { pressLogos } from "../lib/data"

export default function PressSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal className="text-center">
          <div className="mb-4 inline-flex rounded-full bg-brand-500/10 px-4 py-1.5 text-xs font-semibold text-brand-400 uppercase tracking-wider font-display">Presse & Partenaires</div>
          <h3 className="font-display text-xl font-bold mb-10">Ils parlent de nous</h3>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {pressLogos.map((logo) => (
              <div key={logo.name} className="rounded-xl border border-border/40 bg-surface-elevated px-8 py-4 text-text-tertiary text-sm font-semibold font-display hover:border-brand-500/30 hover:text-text-secondary transition-colors cursor-default">
                {logo.name}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
