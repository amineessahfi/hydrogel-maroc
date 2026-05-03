import { Link } from "react-router-dom"
import { ArrowLeft, Droplets, Leaf, Users, Globe } from "lucide-react"

const stats = [
  { icon: <Droplets className="h-6 w-6" />, title: "Founded 2020", desc: "Started in a university lab researching super-absorbent polymers for drought-prone regions." },
  { icon: <Globe className="h-6 w-6" />, title: "40+ Countries", desc: "Our hydrogel is used by farmers across Africa, Asia, South America, and the Middle East." },
  { icon: <Leaf className="h-6 w-6" />, title: "500K+ Hectares", desc: "Over half a million hectares of farmland improved with our water-retention technology." },
]

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <Link to="/" className="mb-6 inline-flex items-center gap-1 text-sm text-text-secondary no-underline hover:text-brand-400 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>
      <h1 className="mb-2 text-3xl font-bold font-display">About HydroGel</h1>
      <p className="mb-12 text-text-secondary">We're on a mission to make every drop of water count in agriculture.</p>
      <div className="grid gap-6 md:grid-cols-3 mb-14">
        {stats.map((item) => (
          <div key={item.title} className="rounded-2xl border border-border/40 bg-surface-elevated p-6 text-center">
            <div className="mb-3 flex h-12 w-12 mx-auto items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">{item.icon}</div>
            <h3 className="font-semibold mb-1 font-display">{item.title}</h3>
            <p className="text-sm text-text-secondary">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="rounded-3xl bg-gradient-to-br from-brand-900/30 to-surface-elevated p-10 md:p-14 border border-brand-500/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400"><Users className="h-5 w-5" /></div>
          <h2 className="text-xl font-bold font-display">Our Team</h2>
        </div>
        <p className="text-text-secondary leading-relaxed">
          We're a team of agronomists, polymer chemists, and farmers working together to solve water scarcity
          in agriculture. Our R&D lab in Nairobi develops formulations tailored to different soil types and
          climates, while our field teams work directly with farmers to optimize application.
        </p>
      </div>
    </main>
  )
}
