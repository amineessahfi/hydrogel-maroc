import { Droplets, TrendingUp, Leaf, Award, Zap, Factory, Globe, Truck, Code } from "lucide-react"

export const problemStats = [
  { value: "85", suffix: "%", label: "de l'agriculture de Rhamna depend de la pluie (bour)" },
  { value: "40", suffix: "%", label: "des recoltes cerealieres perdues lors des annees de secheresse" },
  { value: "280", suffix: "mm", label: "precipitations annuelles moyennes — tres variables" },
]

export const solutionCards = [
  { icon: <Droplets className="h-5 w-5" />, title: "Absorption 400x", stat: "400x", desc: "Chaque granule absorbe 400 fois son poids en eau, creant un reservoir souterrain dans la zone racinaire." },
  { icon: <TrendingUp className="h-5 w-5" />, title: "50% d'Irrigation en Moins", stat: "50%", desc: "Les agriculteurs reduisent leur consommation d'eau de moitie tout en maintenant ou augmentant les rendements." },
  { icon: <Leaf className="h-5 w-5" />, title: "Duree de 3-5 Ans", stat: "5 ans", desc: "Une seule application fonctionne jusqu'a 5 saisons. Se biodegradable en composes benefiques pour le sol." },
]

export const whyRhamnaCards = [
  { icon: <Globe className="h-5 w-5" />, title: "350 000 ha cultives", desc: "Rhamna + Haouz forment la plus grande zone agricole en bour du Maroc. Le stress hydrique y est le facteur limitant n1." },
  { icon: <Factory className="h-5 w-5" />, title: "Zone Industrielle de Benguerir", desc: "Parc industriel moderne avec incitations fiscales. Emplacement ideal pour le stockage et la distribution." },
  { icon: <Code className="h-5 w-5" />, title: "Approche Tech-First", desc: "Suivi numerique des applications, gestion de reseau d'agriculteurs, optimisation des taux par type de sol. L'avantage d'un fondateur ingenieur." },
  { icon: <Truck className="h-5 w-5" />, title: "Hub Logistique", desc: "Position centrale entre Marrakech et Casablanca. Acces direct a l'autoroute A3 pour distribuer dans tout le Maroc." },
]

export const marketData = [
  { label: "Marche Marocain des Polymeres Agricoles 2030", value: "320", suffix: "M", growth: "14.2% TCAC" },
  { label: "Marche Adressable (Rhamna + Haouz)", value: "45", suffix: "M", growth: "350 000 ha cultives" },
  { label: "Objectif Initial (Annee 1)", value: "0.5", suffix: "M", growth: "500 000 MAD — distribution hydrogel" },
]

export const competitors = [
  { name: "HydroGel Maroc", price: "12-18 DH/kg", absorption: "400x", lifespan: "5 ans", local: true, ip: false },
  { name: "SAP Importe (Chine)", price: "25-35 DH/kg", absorption: "300x", lifespan: "3 ans", local: false, ip: false },
  { name: "SAP Importe (Inde)", price: "22-30 DH/kg", absorption: "250x", lifespan: "2-3 ans", local: false, ip: false },
  { name: "Paillis Plastique", price: "8-15 DH/kg", absorption: "N/A", lifespan: "1 saison", local: false, ip: false },
]

export const traction = [
  { value: "1", suffix: "", label: "Projet Lance a Benguerir" },
  { value: "0", suffix: "", label: "Premier Pilote en Preparation" },
  { value: "0", suffix: " ha", label: "Surface a Traiter (Objectif Annee 1)" },
  { value: "100", suffix: "%", label: "Determination" },
]

export const testimonials = [
  { quote: "L'hydrogel a fait ses preuves scientifiquement. Le defi n'est pas technique — c'est la distribution et l'adoption. C'est la qu'un ingenieur logiciel peut apporter une approche differente.", author: "Dr. Mohamed Bourioug", role: "Chercheur, FH Aachen / Maroc — Etude hydrogel-oignon, MDPI Water 2023", initials: "MB" },
  { quote: "Rhamna perd 40% de ses recoltes lors des annees seches. Un produit qui retient l'eau et une plateforme qui suit les resultats — c'est ce dont les cooperatives ont besoin.", author: "Pr. Abdellah Aboudrare", role: "Agronome, UM6P Benguerir", initials: "AA" },
  { quote: "Les petits agriculteurs de Rhamna adoptent les solutions qui marchent. Le bouche-a-oreille fonctionne vite ici. Il faut que le premier sac soit pose sur le premier champ.", author: "Agent de Developpement Local", role: "Province de Rhamna", initials: "DP" },
]

export const team = [
  { name: "Amine Essahfi", role: "Fondateur", initials: "AE", bio: "Ingenieur logiciel. Construit une plateforme de distribution d'hydrogel pour la region de Rhamna. Approche tech-first : identification des sols, suivi des applications, gestion du reseau d'agriculteurs." },
]

export const nextHires = [
  { role: "Agronome commercial", why: "Relation directe avec les agriculteurs et cooperatives de Rhamna." },
  { role: "Responsable logistique", why: "Gestion des stocks hydrogel, transport Benguerir vers exploitations." },
]

export const advisors = [
  { name: "Dr. Mohamed Bourioug", role: "Chercheur Hydrogel, FH Aachen / Maroc" },
  { name: "Pr. Abdellah Aboudrare", role: "Agronomie, UM6P Benguerir" },
]

export const moatItems = [
  { icon: <Code className="h-6 w-6" />, title: "Distribution Tech-Enabled", desc: "Plateforme de suivi des applications hydrogel par parcelle. Donnees de retention hydrique par type de sol. Avantage d'un fondateur ingenieur logiciel." },
  { icon: <Zap className="h-6 w-6" />, title: "Avantage Cout", desc: "Importation directe et revente locale = 40% moins cher que les produits importes via les canaux classiques. Pas d'intermediaire." },
  { icon: <Award className="h-6 w-6" />, title: "Ancrage Local", desc: "Base a Benguerir, connexion UM6P, connaissance du terrain. Un acteur local bat toujours un importateur generique pour la confiance des agriculteurs." },
]

export const useOfFunds = [
  { label: "Stock initial hydrogel", pct: 40, desc: "Premiere commande d'hydrogel (200-500 kg). Conditionnement et marquage HydroGel Maroc." },
  { label: "Pilotes terrain", pct: 25, desc: "5-10 parcelles de demonstration chez des agriculteurs de Rhamna. Suivi et documentation des resultats." },
  { label: "Plateforme & Marketing", pct: 20, desc: "Site e-commerce, outils de suivi, materiel de vente (fiches techniques, posters)." },
  { label: "Fonds de roulement", pct: 15, desc: "Transport, logistique, credit fournisseurs, depenses operationnelles." },
]

export const financials = [
  { year: "2026", revenue: 0.0, costs: 0.15, stage: "Lancement / Commande echantillon" },
  { year: "2027", revenue: 0.5, costs: 0.4, stage: "Premieres ventes" },
  { year: "2028", revenue: 2.0, costs: 1.4, stage: "Seuil de rentabilite" },
  { year: "2029", revenue: 5.0, costs: 3.0, stage: "Expansion regionale" },
]

export const timeline = [
  { period: "Mai 2026", title: "Commande echantillon hydrogel", desc: "Commander 5-10 kg aupres d'un fournisseur. Test en seau et petit bac. Premier contact avec un agriculteur local." },
  { period: "Juin 2026", title: "Premier pilote terrain", desc: "Appliquer l'hydrogel sur une petite parcelle (500 m2 minimum). Documenter avec photos, videos, mesures simples." },
  { period: "Juillet 2026", title: "Dossier INDH", desc: "Deposer le dossier aupres du bureau INDH de la Province de Rhamna avec les resultats du pilote." },
  { period: "Sept 2026", title: "Premiere commande commerciale", desc: "Si INDH approuve: commander 200-500 kg. Conditionner sous marque HydroGel Maroc. Demarrer la distribution." },
  { period: "2027", title: "Extension du reseau", desc: "10-20 agriculteurs reguliers. Plateforme de suivi operationnelle. Candidature Intilaka au CRI." },
]

export const pressLogos = [
  { name: "MDPI Water (etude hydrogel Maroc)", url: "#" },
  { name: "UM6P Benguerir", url: "#" },
  { name: "FH Aachen", url: "#" },
  { name: "MAP Maroc", url: "#" },
  { name: "AgriMaroc.ma", url: "#" },
]
