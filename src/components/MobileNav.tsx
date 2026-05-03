import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { Button } from "./ui/button"
import { Logo } from "./Logo"

const links = [
  { to: "/", label: "Accueil" },
  { to: "/products", label: "Produits" },
  { to: "/contact", label: "Contact" },
  { to: "/contact?type=investor", label: "Investisseurs" },
  { to: "/about", label: "À Propos" },
  { to: "/faq", label: "FAQ" },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (open) { document.body.style.overflow = "hidden" }
    else { document.body.style.overflow = "" }
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(true)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-border hover:bg-muted cursor-pointer transition-colors" aria-label="Menu">
        <Menu className="h-5 w-5" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-surface-elevated shadow-2xl border-l border-border/50">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
              <div onClick={() => setOpen(false)}>
                <Logo size="sm" showTagline={false} />
              </div>
              <button onClick={() => setOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-border hover:bg-muted cursor-pointer transition-colors" aria-label="Fermer">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col p-4 gap-1">
              {links.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium no-underline transition-colors ${
                    location.pathname + location.search === link.to || (link.to === "/" && location.pathname === "/" && !location.search)
                      ? "bg-brand-500/10 text-brand-400"
                      : "text-text-secondary hover:bg-muted hover:text-text"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4">
                <Link to="/products" onClick={() => setOpen(false)}>
                  <Button className="w-full rounded-xl bg-brand-500 hover:bg-brand-600 font-display">Voir les Produits</Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}
