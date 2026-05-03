import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/Home"
import ProductsPage from "./pages/Products"
import CheckoutPage from "./pages/Checkout"
import ContactPage from "./pages/Contact"
import AboutPage from "./pages/About"
import FAQPage from "./pages/FAQ"
import PrivacyPage from "./pages/Privacy"
import TermsPage from "./pages/Terms"
import NotFoundPage from "./pages/NotFound"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
