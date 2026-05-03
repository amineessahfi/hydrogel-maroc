import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link to="/" className="mb-6 inline-flex items-center gap-1 text-sm text-text-secondary no-underline hover:text-brand-500 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>
      <h1 className="mb-2 text-3xl font-bold">Privacy Policy</h1>
      <p className="mb-8 text-text-tertiary">Last updated: January 2026</p>
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>HydroGel respects your privacy. This policy explains how we collect, use, and protect your personal information.</p>
        <h3 className="text-lg font-semibold text-text mt-8">Information We Collect</h3>
        <p>We collect information you provide when placing orders or contacting us: name, email address, shipping address, and payment details. Payment information is processed securely and we do not store full credit card numbers.</p>
        <h3 className="text-lg font-semibold text-text mt-8">How We Use Your Information</h3>
        <p>We use your information to process orders, provide customer support, send order updates, and improve our products. We do not sell or share your personal data with third parties for marketing purposes.</p>
        <h3 className="text-lg font-semibold text-text mt-8">Data Security</h3>
        <p>We implement industry-standard security measures to protect your data. All transactions are encrypted via HTTPS.</p>
        <h3 className="text-lg font-semibold text-text mt-8">Contact</h3>
        <p>For questions about this policy, contact us at privacy@hydrogel.ag.</p>
      </div>
    </main>
  )
}
