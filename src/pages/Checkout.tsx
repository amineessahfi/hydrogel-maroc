import { useState, useId, type FormEvent } from "react"
import { ArrowLeft, Minus, Plus, Trash2, CreditCard, Truck, Check } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { useCart } from "../lib/cart"
import { useToast } from "../lib/toast"

const fieldMeta: Record<string, { label: string; placeholder: string; type?: string }> = {
  name: { label: "Full Name", placeholder: "Jane Smith" },
  email: { label: "Email", placeholder: "jane@farm.com", type: "email" },
  address: { label: "Address", placeholder: "123 Farm Road" },
  city: { label: "City", placeholder: "Nairobi" },
  country: { label: "Country", placeholder: "Kenya" },
  cardNumber: { label: "Card Number", placeholder: "4242 4242 4242 4242" },
  cardExpiry: { label: "Expiry", placeholder: "MM/YY" },
  cardCvc: { label: "CVC", placeholder: "123" },
}

const inputClass = (err: boolean) =>
  `w-full rounded-xl border px-4 py-3 text-sm transition-all bg-surface-card ${
    err ? "border-red-800" : "border-border hover:border-brand-500/50"}`

export default function CheckoutPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string | null>>({})
  const [form, setForm] = useState({
    name: "", email: "", address: "", city: "", country: "",
    cardNumber: "", cardExpiry: "", cardCvc: "", notes: "",
  })

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }))
  }

  const validate = (): boolean => {
    const errs: Record<string, string | null> = {}
    if (!form.name.trim()) errs.name = "Name is required"
    if (!form.email.trim()) errs.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email format"
    if (!form.address.trim()) errs.address = "Address is required"
    if (!form.city.trim()) errs.city = "City is required"
    if (!form.country.trim()) errs.country = "Country is required"
    if (!form.cardNumber.trim()) errs.cardNumber = "Card number is required"
    else if (!/^\d{16}$/.test(form.cardNumber.replace(/\s/g, ""))) errs.cardNumber = "Enter a valid 16-digit card number"
    if (!form.cardExpiry.trim()) errs.cardExpiry = "Expiry is required"
    else if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry)) errs.cardExpiry = "Use MM/YY format"
    if (!form.cardCvc.trim()) errs.cardCvc = "CVC is required"
    else if (!/^\d{3,4}$/.test(form.cardCvc)) errs.cardCvc = "Enter 3 or 4 digits"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    if (items.length === 0) { toast("Your cart is empty", "error"); return }
    setSubmitting(true)
    const order = {
      customer: { name: form.name, email: form.email, address: form.address, city: form.city, country: form.country },
      payment: { last4: form.cardNumber.replace(/\s/g, "").slice(-4) },
      items, total: totalPrice, date: new Date().toISOString(),
    }
    try {
      const res = await fetch("https://webhook.site/__REPLACE_WITH_YOUR_ENDPOINT__", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(order),
      })
      if (!res.ok) throw new Error("Failed")
      toast("Order placed successfully! We'll be in touch.", "success")
      clearCart(); navigate("/")
    } catch {
      console.log("Order data:", JSON.stringify(order, null, 2))
      toast("Order placed! (Demo mode — check console for data)", "success")
      clearCart(); setTimeout(() => navigate("/"), 1500)
    } finally { setSubmitting(false) }
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="mb-4 text-2xl font-bold font-display">Your cart is empty</h1>
        <p className="mb-8 text-text-secondary">Add some hydrogel products to get started.</p>
        <Link to="/products"><Button size="lg" className="rounded-xl bg-brand-500 hover:bg-brand-600 font-display">Browse Products</Button></Link>
      </main>
    )
  }

  const idPrefix = useId()

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <Link to="/products" className="mb-6 inline-flex items-center gap-1 text-sm text-text-secondary no-underline hover:text-brand-400 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </Link>
      <div className="grid gap-10 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-border/40 bg-surface-elevated p-6">
            <h2 className="text-xl font-semibold mb-5 font-display">Shipping Information</h2>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {(["name", "email"] as const).map((field) => {
                  const fid = `${idPrefix}-${field}`; const meta = fieldMeta[field]
                  return (
                    <div key={field}>
                      <label htmlFor={fid} className="mb-1.5 block text-sm font-medium text-text">{meta.label} *</label>
                      <input id={fid} type={meta.type ?? "text"} value={form[field]} onChange={(e) => update(field, e.target.value)} className={inputClass(!!errors[field])} placeholder={meta.placeholder} />
                      {errors[field] && <p className="mt-1 text-xs text-red-400">{errors[field]}</p>}
                    </div>
                  )
                })}
              </div>
              <div>
                <label htmlFor={`${idPrefix}-address`} className="mb-1.5 block text-sm font-medium text-text">Address *</label>
                <input id={`${idPrefix}-address`} value={form.address} onChange={(e) => update("address", e.target.value)} className={inputClass(!!errors.address)} placeholder="123 Farm Road" />
                {errors.address && <p className="mt-1 text-xs text-red-400">{errors.address}</p>}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {(["city", "country"] as const).map((field) => {
                  const fid = `${idPrefix}-${field}`; const meta = fieldMeta[field]
                  return (
                    <div key={field}>
                      <label htmlFor={fid} className="mb-1.5 block text-sm font-medium text-text">{meta.label} *</label>
                      <input id={fid} value={form[field]} onChange={(e) => update(field, e.target.value)} className={inputClass(!!errors[field])} placeholder={meta.placeholder} />
                      {errors[field] && <p className="mt-1 text-xs text-red-400">{errors[field]}</p>}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border/40 bg-surface-elevated p-6">
            <h2 className="text-xl font-semibold mb-5 font-display">Payment Details</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor={`${idPrefix}-cardNumber`} className="mb-1.5 block text-sm font-medium text-text">Card Number *</label>
                <input id={`${idPrefix}-cardNumber`} value={form.cardNumber} onChange={(e) => update("cardNumber", e.target.value.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim())} className={inputClass(!!errors.cardNumber)} placeholder="4242 4242 4242 4242" maxLength={19} />
                {errors.cardNumber && <p className="mt-1 text-xs text-red-400">{errors.cardNumber}</p>}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {(["cardExpiry", "cardCvc"] as const).map((field) => {
                  const fid = `${idPrefix}-${field}`; const meta = fieldMeta[field]
                  return (
                    <div key={field}>
                      <label htmlFor={fid} className="mb-1.5 block text-sm font-medium text-text">{meta.label} *</label>
                      <input id={fid} value={form[field]} onChange={(e) => {
                        if (field === "cardExpiry") { let v = e.target.value.replace(/\D/g, ""); if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2, 4); update(field, v) }
                        else { update(field, e.target.value.replace(/\D/g, "").slice(0, 4)) }
                      }} className={inputClass(!!errors[field])} placeholder={meta.placeholder} maxLength={field === "cardExpiry" ? 5 : 4} />
                      {errors[field] && <p className="mt-1 text-xs text-red-400">{errors[field]}</p>}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor={`${idPrefix}-notes`} className="mb-1.5 block text-sm font-medium text-text">Order Notes</label>
            <textarea id={`${idPrefix}-notes`} value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={3} className={`${inputClass(false)} resize-none`} placeholder="Any special requirements..." />
          </div>

          <Button type="submit" size="xl" className="w-full rounded-2xl bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/25 font-display" disabled={submitting}>
            {submitting ? "Processing..." : <><CreditCard className="mr-2 h-5 w-5" /> Place Order — {totalPrice.toLocaleString("fr-MA")} MAD</>}
          </Button>
        </form>

        <div>
          <div className="rounded-2xl border border-border/40 bg-surface-elevated p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4 font-display">Order Summary</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
                  <div className="flex-1"><div className="font-medium">{item.name}</div><div className="text-text-tertiary">{item.size}</div></div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex h-7 w-7 items-center justify-center rounded-lg border border-border hover:bg-muted cursor-pointer transition-colors"><Minus className="h-3 w-3" /></button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex h-7 w-7 items-center justify-center rounded-lg border border-border hover:bg-muted cursor-pointer transition-colors"><Plus className="h-3 w-3" /></button>
                  </div>
                  <div className="w-16 text-right font-medium">{(item.price * item.quantity).toLocaleString("fr-MA")} MAD</div>
                  <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-300 cursor-pointer transition-colors"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
              <div className="border-t border-border pt-3">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Truck className="h-4 w-4" />
                  {totalPrice >= 99 ? <span className="flex items-center gap-1 text-brand-400"><Check className="h-4 w-4" /> Livraison gratuite</span> : "Livraison gratuite dès 990 MAD"}
                </div>
                <div className="mt-3 flex justify-between text-lg font-bold"><span>Total</span><span>{totalPrice.toLocaleString("fr-MA")} MAD</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
