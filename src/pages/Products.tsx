import { ShoppingCart, ArrowLeft, Minus, Plus, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { ScrollReveal } from "../components/ScrollReveal"
import { useCart } from "../lib/cart"
import { useToast } from "../lib/toast"
import { products, formatPrice } from "../lib/products"

export default function ProductsPage() {
  const { items, addItem, removeItem, updateQuantity, totalItems, totalPrice } = useCart()
  const { toast } = useToast()

  const handleAdd = (p: typeof products[0]) => {
    addItem({ id: p.id, name: p.name, price: p.price, size: p.size })
    toast(`${p.name} added to cart`, "success")
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link to="/" className="mb-2 inline-flex items-center gap-1 text-sm text-text-secondary no-underline hover:text-brand-400 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <h1 className="text-3xl font-bold font-display">Our Products</h1>
        </div>
        {totalItems > 0 && (
          <Link to="/checkout">
            <Button size="lg" className="rounded-xl bg-brand-500 hover:bg-brand-600 shadow-md shadow-brand-500/20 font-display">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Panier ({totalItems}) — {totalPrice.toLocaleString("fr-MA")} MAD
            </Button>
          </Link>
        )}
      </div>

      <div className="grid gap-8 md:grid-cols-3 mb-16">
        {products.map((p, i) => {
          const inCart = items.find((item) => item.id === p.id)
          return (
            <ScrollReveal key={p.id} delay={i * 100}>
              <div className="group relative flex flex-col rounded-3xl border border-border/40 bg-surface-elevated transition-all duration-300 hover:-translate-y-2 hover:border-brand-500/30 hover:shadow-2xl overflow-hidden">
                <div className="flex h-44 items-center justify-center bg-gradient-to-br from-brand-900/40 via-brand-800/20 to-surface-card text-7xl transition-transform duration-500 group-hover:scale-110">
                  {p.image}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="inline-flex w-fit rounded-full bg-brand-500/10 px-2.5 py-0.5 text-xs font-medium text-brand-400">{p.badge}</span>
                  <h3 className="mt-3 text-xl font-semibold font-display">{p.name}</h3>
                  <p className="text-sm text-text-tertiary">{p.size}</p>
                  <div className="mt-2 text-2xl font-bold gradient-text font-display">
                    {formatPrice(p.price)}
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">{p.desc}</p>
                  <ul className="mt-4 space-y-1.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    {p.price === 0 ? (
                      <Link to="/contact"><Button variant="outline" className="w-full rounded-xl border-border/60 font-display">Contact Us</Button></Link>
                    ) : inCart ? (
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(p.id, inCart.quantity - 1)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted cursor-pointer transition-colors"><Minus className="h-4 w-4" /></button>
                        <span className="flex-1 text-center text-sm font-medium">{inCart.quantity} in cart</span>
                        <button onClick={() => handleAdd(p)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted cursor-pointer transition-colors"><Plus className="h-4 w-4" /></button>
                        <button onClick={() => { removeItem(p.id); toast(`${p.name} removed from cart`, "info") }} className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-800 text-red-500 hover:bg-red-950 cursor-pointer transition-colors"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    ) : (
                      <Button className="w-full rounded-xl bg-brand-500 hover:bg-brand-600 shadow-md shadow-brand-500/20 font-display" onClick={() => handleAdd(p)}>
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )
        })}
      </div>
    </main>
  )
}
