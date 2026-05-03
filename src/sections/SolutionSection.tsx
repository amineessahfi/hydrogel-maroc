import { Microscope } from "lucide-react"
import { ScrollReveal } from "../components/ScrollReveal"
import { solutionCards } from "../lib/data"

export default function SolutionSection() {
  return (
    <section id="solution" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="mb-16 text-center">
          <div className="mb-4 inline-flex rounded-full bg-brand-500/10 px-4 py-1.5 text-xs font-semibold text-brand-400 uppercase tracking-wider font-display">Notre Solution</div>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            Un Hydrogel Qui{" "}
            <span className="gradient-text">Fonctionne Avec la Nature</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            Des polymères super-absorbants qui stockent l'eau sous terre et la libèrent quand les cultures en ont besoin — idéal pour les sols de Rhamna.
          </p>
        </ScrollReveal>
        <div className="grid gap-6 md:grid-cols-3 mb-16">
          {solutionCards.map((card, idx) => (
            <ScrollReveal key={card.title} delay={idx * 100}>
              <div className="gradient-border rounded-3xl">
                <div className="rounded-3xl bg-surface-card p-8 h-full">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-400">{card.icon}</div>
                  <div className="text-4xl font-extrabold gradient-text font-display mb-2">{card.stat}</div>
                  <h3 className="text-lg font-semibold mb-2 font-display">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-text-secondary">{card.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="rounded-3xl border border-brand-500/10 bg-surface-elevated p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Microscope className="h-6 w-6 text-brand-400" />
              <h3 className="text-xl font-semibold font-display">Comment Ça Marche</h3>
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              {[
                { step: "01", title: "Appliquer", desc: "Mélanger les granulés secs au sol lors de la plantation. 25-50 kg par hectare selon le type de sol." },
                { step: "02", title: "Absorber", desc: "Les granulés gonflent au contact de l'eau, absorbant 400x leur poids et formant des réservoirs de gel." },
                { step: "03", title: "Libérer", desc: "Le gel libère 95% de l'eau stockée aux racines par pression osmotique — à la demande de la plante." },
                { step: "04", title: "Répéter", desc: "Le gel se réhydrate à chaque pluie ou irrigation. Actif 3-5 ans, puis se biodégrade naturellement." },
              ].map((item) => (
                <div key={item.step} className="relative">
                  <div className="text-sm font-bold text-brand-500 mb-2 font-display">{item.step}</div>
                  <h4 className="text-base font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
