import { Star } from "lucide-react"
import { ScrollReveal } from "../components/ScrollReveal"
import { AnimatedCounter } from "../components/AnimatedCounter"
import { traction, testimonials } from "../lib/data"

export default function TractionSection() {
  return (
    <section id="traction" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="mb-16 text-center">
          <div className="mb-4 inline-flex rounded-full bg-brand-500/10 px-4 py-1.5 text-xs font-semibold text-brand-400 uppercase tracking-wider font-display">Traction</div>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            Des Résultats{" "}
            <span className="gradient-text">Prouvés sur le Terrain</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            Trois pilotes en cours dans la région Rhamna-Haouz. Partenariat de recherche avec l'UM6P.
          </p>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-4 mb-14">
          {traction.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 80}>
              <div className="rounded-3xl border border-border/40 bg-surface-elevated p-6 text-center">
                <div className="text-3xl font-extrabold gradient-text font-display">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-xs font-medium text-text-tertiary uppercase tracking-wider">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.author} className="rounded-2xl border border-border/40 bg-surface-elevated p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-text-secondary italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="text-sm font-semibold">{t.author}</div>
                <div className="text-xs text-text-tertiary">{t.role}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
