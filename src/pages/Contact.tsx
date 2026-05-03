import { useState, useId, type FormEvent } from "react"
import { useSearchParams } from "react-router-dom"
import { ArrowLeft, Send, Mail, Phone, MapPin, Download, Briefcase, ShoppingCart } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { useToast } from "../lib/toast"

const inputClass = (err: boolean) =>
  `w-full rounded-xl border px-4 py-3 text-sm transition-all bg-surface-card ${
    err ? "border-red-800" : "border-border hover:border-brand-500/50"}`

export default function ContactPage() {
  const [searchParams] = useSearchParams()
  const contactType = searchParams.get("type") === "investor" ? "investor" : "general"

  const { toast } = useToast()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string | null>>({})
  const [inquiryType, setInquiryType] = useState(contactType)
  const [form, setForm] = useState({ name: "", email: "", organization: "", subject: "", message: "" })
  const idPrefix = useId()

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }))
  }

  const validate = (): boolean => {
    const errs: Record<string, string | null> = {}
    if (!form.name.trim()) errs.name = "Nom requis"
    if (!form.email.trim()) errs.email = "Email requis"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Format email invalide"
    if (!form.subject.trim()) errs.subject = "Sujet requis"
    if (!form.message.trim()) errs.message = "Message requis"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    const payload = { ...form, inquiryType, date: new Date().toISOString() }
    try {
      const res = await fetch("https://webhook.site/__REPLACE_WITH_YOUR_ENDPOINT__", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Failed")
      toast(inquiryType === "investor" ? "Message reçu ! Nous vous enverrons le pitch deck dans les 24h." : "Message envoyé ! Nous vous répondrons dans les 24h.", "success")
      navigate("/")
    } catch {
      console.log("Contact data:", JSON.stringify(payload, null, 2))
      toast("Message envoyé (mode démo — données dans la console)", "success")
      setTimeout(() => navigate("/"), 1500)
    } finally { setSubmitting(false) }
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <Link to="/" className="mb-6 inline-flex items-center gap-1 text-sm text-text-secondary no-underline hover:text-brand-400 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Retour
      </Link>
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="mb-2 text-3xl font-bold font-display">Contactez-Nous</h1>
          <p className="mb-8 text-text-secondary">Intéressé par un investissement, un partenariat, ou nos produits ? Nous sommes à votre écoute.</p>

          <div className="flex gap-3 mb-8">
            {[
              { id: "general", label: "Client / Partenaire", icon: <ShoppingCart className="h-4 w-4" /> },
              { id: "investor", label: "Investisseur", icon: <Briefcase className="h-4 w-4" /> },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setInquiryType(opt.id)}
                className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all cursor-pointer ${
                  inquiryType === opt.id
                    ? "border-brand-500 bg-brand-500/10 text-brand-400"
                    : "border-border/60 text-text-secondary hover:border-brand-500/30"
                }`}
              >
                {opt.icon} {opt.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              {(["name", "email"] as const).map((field) => {
                const fid = `${idPrefix}-${field}`
                return (
                  <div key={field}>
                    <label htmlFor={fid} className="mb-1.5 block text-sm font-medium text-text">{field === "name" ? "Nom" : "Email"} *</label>
                    <input id={fid} type={field === "email" ? "email" : "text"} value={form[field]} onChange={(e) => update(field, e.target.value)} className={inputClass(!!errors[field])} placeholder={field === "name" ? "Votre nom" : "vous@exemple.ma"} />
                    {errors[field] && <p className="mt-1 text-xs text-red-400">{errors[field]}</p>}
                  </div>
                )
              })}
            </div>
            {inquiryType === "investor" && (
              <div>
                <label htmlFor={`${idPrefix}-organization`} className="mb-1.5 block text-sm font-medium text-text">Organisation / Fonds</label>
                <input id={`${idPrefix}-organization`} value={form.organization} onChange={(e) => update("organization", e.target.value)} className={inputClass(false)} placeholder="Nom de votre fonds ou organisation" />
              </div>
            )}
            <div>
              <label htmlFor={`${idPrefix}-subject`} className="mb-1.5 block text-sm font-medium text-text">Sujet *</label>
              <input id={`${idPrefix}-subject`} value={form.subject} onChange={(e) => update("subject", e.target.value)} className={inputClass(!!errors.subject)} placeholder={inquiryType === "investor" ? "Intérêt pour la levée de fonds" : "Comment pouvons-nous vous aider ?"} />
              {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject}</p>}
            </div>
            <div>
              <label htmlFor={`${idPrefix}-message`} className="mb-1.5 block text-sm font-medium text-text">Message *</label>
              <textarea id={`${idPrefix}-message`} value={form.message} onChange={(e) => update("message", e.target.value)} rows={6} className={`${inputClass(!!errors.message)} resize-none`} placeholder={inquiryType === "investor" ? "Présentez-vous et dites-nous ce que vous aimeriez savoir sur HydroGel et notre levée de fonds..." : "Parlez-nous de votre exploitation, votre type de sol, vos cultures, et ce que vous recherchez..."} />
              {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button type="submit" size="lg" className="rounded-xl bg-brand-500 hover:bg-brand-600 shadow-md shadow-brand-500/20 font-display" disabled={submitting}>
                {submitting ? "Envoi..." : <><Send className="mr-2 h-4 w-4" /> Envoyer</>}
              </Button>
              {inquiryType === "investor" && (
                <Button type="button" variant="outline" size="lg" className="rounded-xl border-border/60 font-display" onClick={() => toast("Pitch deck — téléchargement simulé (mode démo)")}>
                  <Download className="mr-2 h-4 w-4" /> Télécharger le Pitch Deck (PDF)
                </Button>
              )}
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border/40 bg-surface-elevated p-6">
            <h2 className="text-lg font-semibold mb-4 font-display">Contact</h2>
            <div className="space-y-4">
              {[
                { icon: <Mail className="h-5 w-5" />, label: "Email", value: "contact@hydrogel.ma" },
                { icon: <Phone className="h-5 w-5" />, label: "Téléphone", value: "+212 5 24 00 00 00" },
                { icon: <MapPin className="h-5 w-5" />, label: "Siège", value: "Benguerir, Rhamna, Maroc" },
              ].map((item) => (
                <div key={item.label} className="flex gap-3">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">{item.icon}</div>
                  <div><div className="text-xs text-text-tertiary">{item.label}</div><div className="text-sm font-medium text-text">{item.value}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-brand-500/10 bg-brand-500/5 p-6">
            <h3 className="font-semibold mb-2 font-display text-sm">Investisseurs</h3>
            <p className="text-xs text-text-secondary leading-relaxed mb-4">
              Nous levons 8M MAD pour déployer HydroGel dans la région de Rhamna. Pitch deck disponible sur demande.
            </p>
            <Button size="sm" className="rounded-xl bg-accent-500 hover:bg-accent-400 text-black font-display" onClick={() => { setInquiryType("investor"); window.scrollTo({ top: 0, behavior: "smooth" }) }}>
              <Download className="mr-1.5 h-3.5 w-3.5" /> Pitch Deck
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
