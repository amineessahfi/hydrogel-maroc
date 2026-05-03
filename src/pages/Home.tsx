import { Link } from "react-router-dom"
import { ShoppingCart } from "lucide-react"
import { Button } from "../components/ui/button"
import { Logo } from "../components/Logo"
import { MobileNav } from "../components/MobileNav"
import { ThemeToggle } from "../components/ThemeToggle"
import { useCart } from "../lib/cart"
import HeroSection from "../sections/HeroSection"
import ProblemSection from "../sections/ProblemSection"
import WhyRhamnaSection from "../sections/WhyRhamnaSection"
import SolutionSection from "../sections/SolutionSection"
import MarketSection from "../sections/MarketSection"
import MoatSection from "../sections/MoatSection"
import CompetitiveLandscapeSection from "../sections/CompetitiveLandscapeSection"
import TractionSection from "../sections/TractionSection"
import UseOfFundsSection from "../sections/UseOfFundsSection"
import TimelineSection from "../sections/TimelineSection"
import PressSection from "../sections/PressSection"
import FinancialsSection from "../sections/FinancialsSection"
import TeamSection from "../sections/TeamSection"
import InvestorCTASection from "../sections/InvestorCTASection"

const footerLinks: Record<string, { label: string; to: string }[]> = {
  Compagnie: [
    { label: "À Propos", to: "/about" }, { label: "Contact", to: "/contact" },
    { label: "Confidentialité", to: "/privacy" }, { label: "Conditions", to: "/terms" },
  ],
  Produits: [
    { label: "Garden Gel", to: "/products" }, { label: "FarmPro Granules", to: "/products" },
    { label: "Formule Personnalisée", to: "/contact" }, { label: "Commandes en Gros", to: "/contact" },
  ],
  Ressources: [
    { label: "FAQ", to: "/faq" }, { label: "Pitch Deck", to: "/contact" },
    { label: "Recherche", to: "/faq" }, { label: "Carrières", to: "/contact" },
  ],
}

export default function HomePage() {
  const { totalItems } = useCart()

  return (
    <div className="min-h-screen bg-surface">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-xl focus:bg-brand-500 focus:text-white focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:no-underline">
        Aller au contenu
      </a>

      <header className="sticky top-0 z-50 glass border-b border-border/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {["#solution","#why-rhamna","#market","#competitors","#traction","#use-of-funds","#timeline","#team"].map((to) => (
              <a key={to} href={to} className="rounded-lg px-2.5 py-2 text-xs font-medium text-text-secondary no-underline transition-colors hover:bg-muted hover:text-text">
                {to === "#solution" ? "Solution" : to === "#why-rhamna" ? "Rhamna" : to === "#market" ? "Marché" : to === "#competitors" ? "Concurrence" : to === "#traction" ? "Traction" : to === "#use-of-funds" ? "Fonds" : to === "#timeline" ? "Roadmap" : "Équipe"}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/products">
              <Button size="sm" className="rounded-xl bg-brand-500 hover:bg-brand-600 shadow-md shadow-brand-500/20 font-display">
                <ShoppingCart className="mr-1.5 h-4 w-4" />
                {totalItems > 0 ? <span className="mr-1">{totalItems}</span> : "Shop"}
              </Button>
            </Link>
            <MobileNav />
          </div>
        </div>
      </header>

      <main id="main-content">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <WhyRhamnaSection />
        <MarketSection />
        <MoatSection />
        <CompetitiveLandscapeSection />
        <TractionSection />
        <UseOfFundsSection />
        <FinancialsSection />
        <TimelineSection />
        <PressSection />
        <TeamSection />
        <InvestorCTASection />
      </main>

      <footer className="border-t border-border/30 bg-surface px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-4">
            <div>
              <Logo />
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                Technologie hydrique agricole pour un avenir résilient face à la sécheresse. Science marocaine, impact local.
              </p>
            </div>
            {Object.entries(footerLinks).map(([title, items]) => (
              <div key={title}>
                <h4 className="mb-4 text-sm font-semibold text-text font-display">{title}</h4>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item.label}>
                      <Link to={item.to} className="text-sm text-text-secondary no-underline transition-colors hover:text-brand-400">{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 border-t border-border/30 pt-8 text-center text-sm text-text-tertiary">
            &copy; {new Date().getFullYear()} QatraSol Maroc. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  )
}
