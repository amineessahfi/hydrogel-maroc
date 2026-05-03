export interface Product {
  id: string
  name: string
  size: string
  price: number
  badge: string
  desc: string
  features: string[]
  image: string
}

export function formatPrice(price: number): string {
  if (price === 0) return "Devis"
  return `${price.toLocaleString("fr-MA")} MAD`
}

export const products: Product[] = [
  {
    id: "garden-gel",
    name: "Rhamna Garden Gel",
    size: "1 kg",
    price: 290,
    badge: "Best Seller",
    desc: "Pour les petites exploitations et jardins familiaux de la région. Prémélangé pour légumes, oliviers et plantes aromatiques.",
    features: ["Couvre 50 m²", "Dure 3 ans", "Non-toxique, biodégradable", "Mélanger au sol ou appliquer en surface"],
    image: "🌿",
  },
  {
    id: "farmpro-granules",
    name: "FarmPro Granules",
    size: "25 kg",
    price: 4490,
    badge: "Commercial",
    desc: "Polymère de polyacrylate de potassium de qualité industrielle. Optimisé pour l'épandage mécanique sur céréales et grandes cultures.",
    features: ["Couvre 1 250 m²", "Durée de vie 5 ans", "Compatible tous engrais", "Prix de gros disponible"],
    image: "🌾",
  },
  {
    id: "custom-blend",
    name: "Formule Personnalisée",
    size: "Vrac",
    price: 0,
    badge: "Sur Mesure",
    desc: "Formulation d'hydrogel adaptée à votre type de sol, culture et climat. Analyse de sol gratuite incluse. Service en français et arabe.",
    features: ["Formulation spécifique au sol", "Consultation agronomique", "Garantie de performance", "Livraison dans tout le Maroc"],
    image: "🧪",
  },
]
