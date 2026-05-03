import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link to="/" className="mb-6 inline-flex items-center gap-1 text-sm text-text-secondary no-underline hover:text-brand-500 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>
      <h1 className="mb-2 text-3xl font-bold">Terms of Service</h1>
      <p className="mb-8 text-text-tertiary">Last updated: January 2026</p>
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>By using the HydroGel website and purchasing our products, you agree to these terms.</p>
        <h3 className="text-lg font-semibold text-text mt-8">Orders & Payment</h3>
        <p>All orders are subject to availability. Prices are listed in USD and may change without notice. Payment is due at the time of order. We reserve the right to cancel orders due to pricing errors or stock unavailability.</p>
        <h3 className="text-lg font-semibold text-text mt-8">Shipping & Returns</h3>
        <p>We ship worldwide. Delivery times vary by region. Unopened products may be returned within 30 days. Opened products are non-returnable. Return shipping is at the customer's expense unless the product is defective.</p>
        <h3 className="text-lg font-semibold text-text mt-8">Product Usage</h3>
        <p>Follow application guidelines provided with your order. HydroGel is not liable for crop damage resulting from improper application or use outside recommended rates.</p>
        <h3 className="text-lg font-semibold text-text mt-8">Limitation of Liability</h3>
        <p>Our liability is limited to the purchase price of the product. We make no guarantees of specific crop yield improvements as results vary by conditions.</p>
      </div>
    </main>
  )
}
