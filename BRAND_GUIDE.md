# HydroGel Maroc — Brand Guide

## Logo

The HydroGel Maroc logo combines a **water droplet** containing a **sprouting leaf** with the wordmark "HydroGel" and the country designation "MAROC".

### Variants

| Variant | File | Use Case |
|---------|------|----------|
| Full (Dark BG) | `public/logo.svg` | Website navbar, footer, pitch deck on dark backgrounds |
| Full (Light BG) | `public/logo-light.svg` | Print, documents, light mode applications |
| Icon Only | `public/logo-icon.svg` | Favicon, app icon, social profile picture |
| Favicon | `public/favicon.svg` | Browser tab, bookmarks |

### Clear Space

Maintain at least the height of the droplet icon as clear space on all sides of the logo.

### Minimum Size

- Full logo: 120px wide minimum
- Icon only: 32px minimum

---

## Colors

### Primary Palette

| Color | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Emerald | `#10b981` | `brand-500` | Primary brand color, CTAs, logo gradient |
| Deep Emerald | `#059669` | `brand-600` | Hover states, dark backgrounds |
| Teal | `#14b8a6` | `teal-500` | Logo gradient end, accents |
| Dark Teal | `#0d9488` | `teal-600` | Secondary accents |

### Accent

| Color | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Gold/Amber | `#f59e0b` | `accent-500` | Highlights, warnings, special CTAs |
| Light Gold | `#fbbf24` | `accent-400` | Gradient text, hover accents |

### Surfaces (Dark Mode — Default)

| Color | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Background | `#09090b` | `surface` | Page background |
| Elevated | `#121214` | `surface-elevated` | Cards, panels |
| Card | `#18181b` | `surface-card` | Gradient-border cards |
| Muted | `#1f1f23` | `muted` | Secondary backgrounds |

### Surfaces (Light Mode)

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#fafaf9` | Page background |
| Elevated | `#ffffff` | Cards, panels |

### Text

| Color | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Primary | `#fafafa` / `#0c0a09` | `text` | Body text, headings |
| Secondary | `#a1a1aa` / `#57534e` | `text-secondary` | Descriptions |
| Tertiary | `#71717a` / `#a8a29e` | `text-tertiary` | Captions, metadata |

---

## Typography

### Primary Font: Sora
- **Usage:** Headings, buttons, logo, badges, stats
- **Weights:** 400, 500, 600, 700, 800
- **CSS:** `font-family: 'Sora', 'Inter', system-ui, sans-serif`
- **Tailwind:** `font-display`

### Secondary Font: Inter
- **Usage:** Body text, descriptions, forms, navigation
- **Weights:** 400, 500, 600, 700
- **CSS:** `font-family: 'Inter', system-ui, -apple-system, sans-serif`
- **Tailwind:** `font-sans` (default)

### Type Scale

| Level | Size | Weight | Font | Usage |
|-------|------|--------|------|-------|
| H1 | 5xl-7xl | 800 | Sora | Hero headlines |
| H2 | 3xl-5xl | 700 | Sora | Section titles |
| H3 | xl-2xl | 600 | Sora | Card titles |
| Body | base | 400 | Inter | Paragraphs |
| Small | sm | 400 | Inter | Descriptions |
| Caption | xs | 500 | Sora | Badges, labels |

---

## Tone of Voice

### What We Sound Like
- **Direct** — No jargon. Farmers and investors both understand us.
- **Local** — French/Arabic bilingual. Morocco-first, Rhamna-first.
- **Honest** — We say "premier pilote en préparation," not "leading the industry."
- **Technical but accessible** — Explain the science, don't hide behind it.

### What We Don't Sound Like
- Corporate (no "synergistic solutions" or "leveraging paradigms")
- Over-promising (no invented traction numbers)
- Silicon Valley (we're in Benguerir, not San Francisco)

---

## Gradient Usage

### Gradient Text (Headlines)
```css
background: linear-gradient(135deg, #34d399 0%, #10b981 30%, #fbbf24 70%, #34d399 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```
Used on key section headings. Animated 4-second cycle.

### Gradient Background (CTA sections)
```css
background: linear-gradient(135deg, #047857, #065f46, #064e3b);
```

### Logo Gradient
```css
background: linear-gradient(135deg, #10b981, #14b8a6);
```

---

## Social Media Assets

### Profile Picture
- Use `logo-icon.svg` (square, 48×48 with dark background)
- Works on LinkedIn, Twitter/X, GitHub, WhatsApp Business

### Banner / Cover
- Dark gradient background (#09090b → #064e26)
- Logo centered
- Tagline: "Rétention d'eau agricole — Région Rhamna, Maroc"

### Hashtags
```
#HydroGelMaroc #AgricultureMaroc #Rhamna #EauAgricole #AgriTech #Secheresse #GénérationGreen
```
