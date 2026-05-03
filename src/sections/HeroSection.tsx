import { Link } from "react-router-dom"
import { ArrowRight, Sparkles, Download } from "lucide-react"
import { Button } from "../components/ui/button"
import { ScrollReveal } from "../components/ScrollReveal"
import { AnimatedCounter } from "../components/AnimatedCounter"
import { traction } from "../lib/data"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-36 pt-20 md:pt-32">
      <div className="absolute inset-0 -z-10 mesh-bg" />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-[0.03]" />
      <div className="absolute top-32 left-[10%] h-80 w-80 rounded-full bg-brand-600/20 blur-3xl animate-float" />
      <div className="absolute top-48 right-[5%] h-72 w-72 rounded-full bg-brand-500/15 blur-3xl animate-float-delayed" />
      <div className="absolute bottom-32 left-[35%] h-64 w-64 rounded-full bg-brand-700/15 blur-3xl animate-float-slow" />

      <ScrollReveal className="relative mx-auto max-w-5xl text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/5 px-4 py-1.5 backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-brand-400" />
          <span className="text-sm font-medium text-brand-300 font-display">Levée de Fonds en Cours — Région Rhamna, Maroc</span>
        </div>

        <h1 className="mb-6 font-display text-5xl font-extrabold leading-[1.08] tracking-tight md:text-7xl">
          L'Eau Agricole<br />
          <span className="gradient-text">Réinventée au Maroc</span>
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
          Technologie d'hydrogel brevetée qui réduit l'irrigation de 50%, augmente les rendements de 30%,
          et construit la résilience à la sécheresse pour les agriculteurs de Rhamna et au-delà.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center mb-20">
          <Link to="/contact">
            <Button size="xl" className="rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 shadow-xl shadow-brand-500/25 font-display font-semibold">
              <Download className="mr-2 h-5 w-5" /> Recevoir le Pitch Deck
            </Button>
          </Link>
          <a href="#traction">
            <Button variant="outline" size="xl" className="rounded-2xl border-border/60 font-display">
              Voir Nos Résultats <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {traction.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-extrabold tracking-tight md:text-4xl gradient-text font-display">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-xs font-medium text-text-tertiary uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
