import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, ChevronDown } from "lucide-react"

const faqs = [
  { q: "What is hydrogel and how does it work?", a: "Hydrogel is a super-absorbent polymer (potassium polyacrylate) that absorbs and retains water up to 400 times its weight. When mixed into soil, it creates water reservoirs at the root zone, releasing moisture as plants need it through osmotic pressure differences." },
  { q: "How long does hydrogel last in soil?", a: "Our hydrogel remains effective for 3-5 years depending on soil conditions, microbial activity, and climate. It biodegrades naturally into water, carbon dioxide, and potassium — all beneficial to soil." },
  { q: "Is hydrogel safe for food crops?", a: "Yes. Our hydrogel is non-toxic, heavy-metal free, and certified for use in food agriculture. It breaks down into plant-friendly compounds and does not accumulate in crops." },
  { q: "How much hydrogel do I need?", a: "Garden Gel covers approximately 50 m² per kg. FarmPro Granules cover about 50 m² per kg as well — a 25 kg bag covers roughly 1,250 m². For precise rates, contact our agronomists." },
  { q: "Can I use hydrogel with fertilizers?", a: "Yes. Hydrogel is compatible with all common fertilizers. In fact, it helps retain nutrients in the root zone, reducing fertilizer runoff by up to 30%." },
  { q: "What crops benefit most from hydrogel?", a: "Vegetables, fruits, grains, and orchard crops all benefit. Sandy soils and drought-prone regions see the biggest improvements." },
]

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link to="/" className="mb-6 inline-flex items-center gap-1 text-sm text-text-secondary no-underline hover:text-brand-500 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>
      <h1 className="mb-2 text-3xl font-bold">Frequently Asked Questions</h1>
      <p className="mb-10 text-text-secondary">Everything you need to know about hydrogel agriculture.</p>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-2xl border border-border/50 bg-surface-elevated overflow-hidden transition-all">
            <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between px-5 py-4 text-left font-medium hover:bg-muted/50 cursor-pointer transition-colors">
              <span>{faq.q}</span>
              <ChevronDown className={`h-4 w-4 shrink-0 ml-4 text-text-tertiary transition-transform duration-200 ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm leading-relaxed text-text-secondary border-t border-border/50 pt-4 mx-5">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
