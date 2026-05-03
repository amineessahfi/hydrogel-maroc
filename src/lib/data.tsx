import { Droplets, TrendingUp, Leaf, Award, Lock, Zap, Factory, Globe, Truck } from "lucide-react"

export const problemStats = [
  { value: "85", suffix: "%", label: "de l'agriculture de Rhamna dépend de la pluie (bour)" },
  { value: "40", suffix: "%", label: "des récoltes céréalières perdues lors des années de sécheresse" },
  { value: "280", suffix: "mm", label: "précipitations annuelles moyennes — très variables" },
]

export const solutionCards = [
  { icon: <Droplets className="h-5 w-5" />, title: "Absorption 400x", stat: "400x", desc: "Chaque granulé absorbe 400 fois son poids en eau, créant un réservoir souterrain dans la zone racinaire." },
  { icon: <TrendingUp className="h-5 w-5" />, title: "50% d'Irrigation en Moins", stat: "50%", desc: "Les agriculteurs réduisent leur consommation d'eau de moitié tout en maintenant ou augmentant les rendements." },
  { icon: <Leaf className="h-5 w-5" />, title: "Durée de 3-5 Ans", stat: "5 ans", desc: "Une seule application fonctionne jusqu'à 5 saisons. Se biodégrade en composés bénéfiques pour le sol." },
]

export const whyRhamnaCards = [
  { icon: <Globe className="h-5 w-5" />, title: "350 000 ha cultivés", desc: "Rhamna + Haouz forment la plus grande zone agricole en bour du Maroc. Le stress hydrique y est le facteur limitant n°1." },
  { icon: <Factory className="h-5 w-5" />, title: "Zone Industrielle de Benguerir", desc: "Parc industriel moderne avec incitations fiscales. Idéal pour notre unité de production de 500 tonnes/an." },
  { icon: <Award className="h-5 w-5" />, title: "Partenariat UM6P", desc: "L'université Mohammed VI Polytechnique à Benguerir fournit R&D, laboratoires, et validation terrain. Nos 3 pilotes y sont hébergés." },
  { icon: <Truck className="h-5 w-5" />, title: "Hub Logistique", desc: "Position centrale entre Marrakech et Casablanca. Accès direct à l'autoroute A3 pour distribuer dans tout le Maroc." },
]

export const marketData = [
  { label: "Marché Marocain des Polymères Agricoles 2030", value: "320", suffix: "M", growth: "14.2% TCAC" },
  { label: "Marché Adressable (Rhamna + Haouz)", value: "45", suffix: "M", growth: "350 000 ha cultivés" },
  { label: "Objectif Initial (Année 1-3)", value: "12", suffix: "M", growth: "5 000 ha dans Rhamna" },
]

export const competitors = [
  { name: "HydroGel Maroc", price: "12-18 DH/kg", absorption: "400x", lifespan: "5 ans", local: true, ip: true },
  { name: "SAP Importé (Chine)", price: "25-35 DH/kg", absorption: "300x", lifespan: "3 ans", local: false, ip: false },
  { name: "SAP Importé (Inde)", price: "22-30 DH/kg", absorption: "250x", lifespan: "2-3 ans", local: false, ip: false },
  { name: "Paillis Plastique", price: "8-15 DH/kg", absorption: "N/A", lifespan: "1 saison", local: false, ip: false },
]

export const traction = [
  { value: "3", suffix: "", label: "Pilotes Actifs dans la Région" },
  { value: "280", suffix: "+", label: "Agriculteurs Utilisant HydroGel" },
  { value: "450", suffix: " ha", label: "Surface Cumulée Traitée" },
  { value: "94", suffix: "%", label: "Taux de Rétention Agriculteurs" },
]

export const testimonials = [
  { quote: "Avec HydroGel, j'ai réduit ma consommation d'eau de moitié et mon rendement de blé a augmenté de 30%. Sur 4 hectares, c'est la différence entre survivre et prospérer.", author: "Hassan El Mansouri", role: "Céréaliculteur, Sidi Bou Othmane — Pilote 2024", initials: "HE" },
  { quote: "La première saison avec HydroGel, nous avons survécu à 5 semaines sans pluie. Sans le gel, nous aurions tout perdu. Chaque agriculteur de la région a besoin de ça.", author: "Fatima Zahra Bennis", role: "Maraîchère, Benguerir — Pilote 2024", initials: "FB" },
  { quote: "Nous avons mené un essai contrôlé sur la culture d'oignon. Le groupe HydroGel a utilisé 48% moins d'eau avec un rendement statistiquement équivalent. Résultats publiés.", author: "Dr. Mohamed Bourioug", role: "Chercheur Agronome, UM6P — Partenaire R&D", initials: "MB" },
]

export const timeline = [
  { period: "T4 2026", title: "Clôture de la levée", desc: "Finalisation des 8M MAD. Recrutement de l'équipe R&D (4 personnes) et démarrage des travaux à Benguerir." },
  { period: "S1 2027", title: "Unité pilote", desc: "Mise en service de l'unité de production (capacité: 200 t/an). Début des ventes commerciales dans Rhamna." },
  { period: "S2 2027", title: "Validation terrain", desc: "10 pilotes additionnels. Publication des résultats avec l'UM6P. Obtention certification ONSSA." },
  { period: "2028", title: "Seuil de rentabilité", desc: "Montée en capacité à 500 t/an. Expansion vers Haouz et Tadla. 5 000 ha cumulés traités." },
  { period: "2029", title: "Expansion nationale", desc: "Distribution dans 6 régions du Maroc. Développement de formulations pour arboriculture (oliviers, agrumes)." },
]

export const pressLogos = [
  { name: "L'Économiste", url: "#" },
  { name: "AgriMaroc.ma", url: "#" },
  { name: "MDPI Water", url: "#" },
  { name: "UM6P Research", url: "#" },
  { name: "MAP Maroc", url: "#" },
]

export const team = [
  { name: "Dr. Youssef El Amrani", role: "CEO & Co-Fondateur", initials: "YA", bio: "PhD Chimie des Polymères, UM6P. 12 ans en R&D matériaux agricoles. Ancien chercheur au MAScIR Foundation." },
  { name: "Khadija Benchekroun", role: "CTO & Co-Fondatrice", initials: "KB", bio: "MSc Génie Chimique, EMI. A inventé le procédé de polymérisation à faible coût. 3 brevets déposés." },
  { name: "Driss Ait Ouakrim", role: "Directeur Agronomique", initials: "DA", bio: "20 ans en agriculture durable au Maroc. Ancien directeur technique ORMVA Haouz. A piloté des programmes sur 200 000+ ha." },
  { name: "Salma Alaoui", role: "Directrice Croissance", initials: "SA", bio: "Ex-OCP Group. A construit des réseaux de distribution agricole couvrant 50 000+ petits exploitants." },
]

export const advisors = [
  { name: "Pr. Abdellah Aboudrare", role: "Agronomie, UM6P Benguerir" },
  { name: "Dr. Mohamed Bourioug", role: "Chercheur Hydrogel, FH Aachen / Maroc" },
  { name: "Nadia Laraki", role: "Investisseuse Agritech, Maroc Numeric Fund" },
]

export const moatItems = [
  { icon: <Lock className="h-6 w-6" />, title: "Protection IP", desc: "3 brevets couvrant notre procédé de polymérisation basse température et nos formulations adaptées aux sols marocains. 2 en instance." },
  { icon: <Zap className="h-6 w-6" />, title: "Avantage Coût", desc: "Notre procédé réduit le coût de production de 60% par rapport aux importateurs. Prix de vente: 40% sous la moyenne du marché importé." },
  { icon: <Award className="h-6 w-6" />, title: "Validation Terrain", desc: "3 pilotes Rhamna-Haouz. Résultats publiés dans Agricultural Water Management. Partenariat R&D avec UM6P." },
]

export const useOfFunds = [
  { label: "R&D & Formulations locales", pct: 30, desc: "Adapter l'hydrogel aux sols de Rhamna (sableux-limoneux, salins). Essais terrain avec UM6P." },
  { label: "Unité de Production", pct: 35, desc: "Construire une unité de polymérisation à Benguerir (Zone Industrielle). Capacité: 500 tonnes/an." },
  { label: "Distribution & Force de Vente", pct: 20, desc: "Équipe terrain de 12 agronomes-commerciaux. Partenariats avec coopératives agricoles locales." },
  { label: "Fonds de Roulement", pct: 15, desc: "Stock initial, crédit fournisseurs, fonds de garantie pour petits exploitants." },
]

export const financials = [
  { year: "2026", revenue: 0.4, costs: 0.6, stage: "Pré-revenu / Pilotes" },
  { year: "2027", revenue: 2.1, costs: 2.8, stage: "Lancement commercial" },
  { year: "2028", revenue: 6.5, costs: 5.9, stage: "Seuil de rentabilité" },
  { year: "2029", revenue: 15.0, costs: 10.5, stage: "Expansion Maroc" },
]
