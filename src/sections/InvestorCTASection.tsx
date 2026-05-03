import { Link } from "react-router-dom"
import { ChevronRight, Download } from "lucide-react"
import { Button } from "../components/ui/button"
import { ScrollReveal } from "../components/ScrollReveal"

export default function InvestorCTASection() {
  return (
    <ScrollReveal className="mx-auto max-w-5xl px-6 py-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 p-14 md:p-20 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent_70%)]" />
        <div className="absolute top-10 right-10 h-80 w-80 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="relative">
          <h2 className="mb-4 font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
            Demarrez Avec Nous
          </h2>
          <p className="mx-auto mb-4 max-w-2xl text-lg text-brand-200">
            HydroGel Maroc cherche un premier financement pour lancer la distribution d'hydrogel dans la region de Rhamna. Bootstrap, INDH, ou partenaire — on commence petit et on prouve.
          </p>
          <div className="flex items-center justify-center gap-6 mb-10 text-sm text-brand-300 flex-wrap">
            <span className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-brand-400" /> Phase: amorcage</span>
            <span className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-brand-400" /> Base: Benguerir, Rhamna</span>
            <span className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-brand-400" /> Contact: amine@hydrogel.ma</span>
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link to="/contact?type=investor">
              <Button size="xl" className="rounded-2xl bg-white text-brand-800 hover:bg-brand-50 shadow-xl shadow-black/30 font-display font-semibold">
                <Download className="mr-2 h-5 w-5" /> Pitch Deck (PDF)
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="xl" className="rounded-2xl border-2 border-white/25 text-white hover:bg-white/10 font-display">
                Contacter le Fondateur <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}
